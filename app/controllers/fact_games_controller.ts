import type { HttpContext } from '@adonisjs/core/http'

import FactGame from '#models/fact_game'
import { extractErrorMessage, randomIntFromInterval } from '../utils.js'

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

  async createGame({ request }: HttpContext) {
    try {
      const { homeTeamId, awayTeamId } = request.body()
      if (!homeTeamId || !awayTeamId) {
        return { message: 'Veuillez remplir tous les champs' }
      }

      // if (!Number(homeTeamId) || !Number(awayTeamId)) {
      //   return { message: 'Veuillez entrer des nombres' }
      // }

      if (homeTeamId === awayTeamId) {
        return { message: 'Les 2 équipes doivent être différentes' }
      }

      const game = new FactGame()
      game.homeTeamId = homeTeamId
      game.awayTeamId = awayTeamId
      const firstScore = randomIntFromInterval(0, 5)
      game.homeScore = firstScore
      const secondScore = randomIntFromInterval(0, 5)
      game.awayScore = secondScore

      await game.save()
      return { message: 'Match simulé avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
