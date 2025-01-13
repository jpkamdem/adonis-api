import type { HttpContext } from '@adonisjs/core/http'

import Player from '#models/player'
import { extractErrorMessage } from '../utils.js'
import type { Position } from '../enums.js'

export default class PlayersController {
  async getAllPlayers() {
    try {
      const players = await Player.all()
      if (!players) {
        return { message: 'Erreur lors de la récupération des joueurs' }
      }

      return players
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getPlayerById({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const player = await Player.findOrFail(id)
      if (!player) {
        return { message: 'Joueur introuvable' }
      }

      return player
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async createPlayer({ request }: HttpContext) {
    try {
      const { firstName, lastName, number, position, teamId } = request.body()
      if (!firstName || !lastName || !number || !position || !teamId) {
        return { message: 'Veuillez remplir tous les champs' }
      }

      const player = new Player()
      player.firstName = firstName
      player.lastName = lastName
      player.number = number
      player.position = position
      player.teamId = teamId

      await player.save()
      return { message: 'Joueur créé avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async updatePlayer({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const player = await Player.findOrFail(id)
      if (!player) {
        return { message: 'Joueur introuvable' }
      }

      if ('firstName' in request.body()) {
        const { firstname } = request.body()
        if (typeof firstname !== 'string') {
          return { message: 'Veuillez rentrer une chaîne de caractère' }
        }

        player.firstName = firstname
      }

      if ('lastName' in request.body()) {
        const { lastName } = request.body()
        if (typeof lastName !== 'string') {
          return { message: 'Veuillez rentrer une chaîne de caractère' }
        }

        player.lastName = lastName
      }

      if ('number' in request.body()) {
        const { number } = request.body()
        if (typeof number !== 'number') {
          return { message: 'Veuillez rentrer un nombre' }
        }

        player.number = number
      }

      if ('position' in request.body()) {
        const { position } = request.body()
        if (typeof position !== 'string') {
          return { message: 'Veuillez rentrer une chaîne de caractère' }
        }

        const posCheck = ['gk', 'def', 'mf', 'fw'] as const
        const isPos = (x: any): x is Position => posCheck.includes(x)
        if (!isPos(position)) {
          return { message: 'Poste invalide' }
        }

        player.position = position
      }

      if ('teamId' in request.body()) {
        const { teamId } = request.body()
        if (typeof teamId !== 'number') {
          return { message: 'Veuillez rentrer un nombre' }
        }

        player.teamId = teamId
      }

      await player.save()
      return { message: 'Modification(s) effectuée(s) avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async deletePlayer({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const player = await Player.findOrFail(id)
      if (!player) {
        return { message: 'Joueur introuvable' }
      }

      await player.delete()
      return { message: 'Joueur supprimé avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
