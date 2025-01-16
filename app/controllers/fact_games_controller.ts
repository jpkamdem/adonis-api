import type { HttpContext } from '@adonisjs/core/http'

import FactGame from '#models/fact_game'
import { extractErrorMessage, randomIntFromInterval } from '../utils.js'
import Team from '#models/team'

export default class FactGamesController {
  async getAllGames() {
    try {
      const games = await FactGame.all()
      if (!games) {
        return { message: 'Erreur lors de la récupération des matchs' }
      }

      return games
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getGameById({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const game = await FactGame.findOrFail(id)
      if (!game) {
        return { message: 'Match introuvable' }
      }

      return game
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async createGame() {
    try {
      const teams = await Team.all()
      if (!teams) {
        return { message: 'Erreur interne' }
      }

      if (teams.length <= 1) {
        return { message: "Il n'y a pas assez d'équipes pour simuler un match" }
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
      return { message: 'Match simulé avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
