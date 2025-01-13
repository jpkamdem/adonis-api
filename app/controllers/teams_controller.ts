import type { HttpContext } from '@adonisjs/core/http'
import Team from '#models/team'
import db from '@adonisjs/lucid/services/db'
import { extractErrorMessage } from '../utils.js'

export default class TeamsController {
  async getAllTeams() {
    try {
      const teams = await Team.all()
      if (!teams) {
        return { message: 'Erreur lors de la récupération des équipes' }
      }

      return teams
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getTeamById({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const team = await Team.findOrFail(id)
      return team
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getTeamPlayers({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return { message: 'Équipe introuvable' }
      }

      const teamWithPlayers = db
        .query()
        .from('teams')
        .join('players', 'teams.id', '=', 'players.team_id')
        .select(
          'players.first_name as playerFirstName',
          'players.last_name as playerLastName',
          'players.team_id',
          'teams.name as teamName',
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
      return { message: extractErrorMessage(error) }
    }
  }

  async createTeam({ request }: HttpContext) {
    try {
      const { name } = request.body()
      if (!name) {
        return { message: 'Veuillez remplir le champ' }
      }

      if (typeof name !== 'string') {
        return { message: 'Veuillez entrer une chaîne de caractère' }
      }

      const team = new Team()
      team.name = name

      await team.save()
      return { message: 'Équipe créée avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async updateTeam({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return { message: 'Équipe introuvable' }
      }

      const { name } = request.body()
      if (!name) {
        return { message: 'Veuillez remplir le champ' }
      }

      if (typeof name !== 'string') {
        return { message: 'Veuillez entrer une chaîne de caractère' }
      }

      team.name = name
      await team.save()
      return { message: "Modification de l'équipe effectuée avec succès" }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async deleteTeam({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const team = await Team.findOrFail(id)
      if (!team) {
        return { message: 'Équipe introuvable' }
      }

      await team.delete()
      return { message: 'Équipe supprimmée avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
