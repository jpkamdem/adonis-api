import type { HttpContext } from '@adonisjs/core/http'
import FactGame from '#models/fact_game'
import { extractErrorMessage, randomIntFromInterval } from '../utils.js'
import Team from '#models/team'

export default class FactGamesController {
  async getAllGames({ response }: HttpContext) {
    try {
      const games = await FactGame.all()
      if (!games) {
        return response.abort({ message: 'Erreur lors de la récupération des matchs' })
      }

      return response.status(200).json(games)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async getGameById({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const game = await FactGame.findOrFail(id)
      if (!game) {
        return response.abort({ message: 'Match introuvable' })
      }

      return response.status(200).json(game)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async createGame({ response }: HttpContext) {
    try {
      const teams = await Team.all()
      if (!teams) {
        return response.abort({ message: 'Erreur interne' })
      }

      if (teams.length <= 1) {
        return response.abort({ message: "Il n'y a pas assez d'équipes pour simuler un match" })
      }

      const teamIds = teams.map((team) => team.id)
      const homeId = teamIds[randomIntFromInterval(0, teamIds.length)]
      let awayId: number
      do {
        awayId = teamIds[randomIntFromInterval(0, teamIds.length)]
      } while (homeId === awayId)

      const game = new FactGame()
      game.homeTeamId = homeId
      game.awayTeamId = awayId
      game.homeScore = randomIntFromInterval(0, 5)
      game.awayScore = randomIntFromInterval(0, 5)
      await game.save()
      return response.status(201).json({ message: 'Match simulé avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }
}
