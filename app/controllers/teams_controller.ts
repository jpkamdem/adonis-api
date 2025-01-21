import type { HttpContext } from '@adonisjs/core/http'
import Team from '#models/team'
import db from '@adonisjs/lucid/services/db'
import { extractErrorMessage } from '../utils.js'
import { createTeamValidator } from '#validators/team'

export default class TeamsController {
  async getAllTeams({ response }: HttpContext) {
    try {
      const teams = await Team.all()
      if (!teams) {
        return response.abort({ message: 'Erreur lors de la récupération des équipes' })
      }

      return response.status(200).json(teams)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async getTeamById({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return response.abort({ message: 'Équipe introuvable' })
      }

      return response.status(200).json(team)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async getTeamPlayers({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return response.abort({ message: 'Équipe introuvable' })
      }

      const teamWithPlayers = db
        .query()
        .from('teams')
        .join('players', 'teams.id', '=', 'players.team_id')
        .select(
          'players.first_name as p_firstname',
          'players.last_name as p_lastname',
          'players.team_id',
          'teams.name as team_name',
          'teams.wins',
          'teams.loses',
          'teams.draws',
          'players.position',
          'players.number',
          'players.status'
        )
        .where('teams.id', id)

      return teamWithPlayers
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async getAllTeamsWithPlayers({ response }: HttpContext) {
    try {
      const allTeamsWithPlayers = db
        .query()
        .from('teams')
        .join('players', 'teams.id', '=', 'players.team_id')
        .select(
          'players.first_name as p_firstname',
          'players.last_name as p_lastname',
          'players.team_id',
          'teams.name as team_name',
          'teams.wins',
          'teams.loses',
          'teams.draws',
          'players.position',
          'players.number',
          'players.status'
        )

      return allTeamsWithPlayers
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async createTeam({ request, response }: HttpContext) {
    try {
      const { name } = await request.validateUsing(createTeamValidator)

      const team = new Team()
      team.name = name

      await team.save()
      return response.status(201).json({ message: 'Équipe créée avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async updateTeam({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return response.abort({ message: 'Équipe introuvable' })
      }

      const { name } = await request.validateUsing(createTeamValidator)

      team.name = name
      await team.save()
      return response
        .status(201)
        .json({ message: "Modification de l'équipe effectuée avec succès" })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async deleteTeam({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return response.abort({ message: 'Équipe introuvable' })
      }

      await team.delete()
      return response.status(204).json({ message: 'Équipe supprimmée avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }
}
