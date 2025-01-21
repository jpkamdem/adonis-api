import type { HttpContext } from '@adonisjs/core/http'
import Player from '#models/player'
import { extractErrorMessage } from '../utils.js'
import { createPlayerValidator, updatePlayerValidator } from '#validators/player'
import Team from '#models/team'

export default class PlayersController {
  async getAllPlayers({ response }: HttpContext) {
    try {
      const players = await Player.all()
      if (!players) {
        return response.status(404).json({ message: 'Erreur lors de la récupération des joueurs' })
      }

      return response.status(200).json(players)
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }

  async getPlayerById({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const player = await Player.findOrFail(id)
      if (!player) {
        return response.status(404).json({ message: 'Joueur introuvable' })
      }

      return response.status(200).json(player)
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }

  async createPlayer({ request, response }: HttpContext) {
    try {
      const { firstName, lastName, number, position, teamId } =
        await request.validateUsing(createPlayerValidator)

      const team = await Team.findByOrFail('teams.id', teamId)
      if (!team) {
        return response.status(404).json({ message: 'Équipe introuvable' })
      }

      const player = new Player()
      player.firstName = firstName
      player.lastName = lastName
      player.number = number
      player.position = position
      player.teamId = teamId

      await player.save()
      return response.status(201).json({ message: 'Joueur créé avec succès' })
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }

  async updatePlayer({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const player = await Player.findOrFail(id)
      if (!player) {
        return response.status(404).json({ message: 'Joueur introuvable' })
      }

      const { firstName, lastName, number, position, teamId } =
        await request.validateUsing(updatePlayerValidator)

      if (firstName) {
        player.firstName = firstName
      }

      if (lastName) {
        player.lastName = lastName
      }

      if (number) {
        player.number = number
      }

      if (position) {
        player.position = position
      }

      if (teamId) {
        player.teamId = teamId
      }

      await player.save()
      return response.status(201).json({ message: 'Modification(s) effectuée(s) avec succès' })
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }

  async deletePlayer({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const player = await Player.findOrFail(id)
      if (!player) {
        return response.status(404).json({ message: 'Joueur introuvable' })
      }

      await player.delete()
      return response.status(204).json({ message: 'Joueur supprimé avec succès' })
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }
}
