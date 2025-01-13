import type { HttpContext } from '@adonisjs/core/http'
import { extractErrorMessage } from '../utils.js'
import Incident from '#models/incident'

export default class IncidentsController {
  async getAllIncidents() {
    try {
      const incidents = await Incident.all()
      if (!incidents) {
        return { message: 'Erreur lors de la récupération des incidents' }
      }

      return incidents
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getIncidentById({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const incident = await Incident.findOrFail(id)
      if (!incident) {
        return { message: 'Incident introuvable' }
      }

      return incident
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async createIncident({ request }: HttpContext) {
    try {
      const { type } = request.body()
      if (!type) {
        return { message: 'Veuillez remplir le champ' }
      }

      if (typeof type !== 'string') {
        return { message: 'Veuillez entrer une chaîne de caractère' }
      }

      const incident = new Incident()
      incident.type = type
      await incident.save()
      return { message: 'Incident créé avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async updateIncident({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const incident = await Incident.findOrFail(id)
      if (!incident) {
        return { message: 'Incident introuvable' }
      }

      const { type } = request.body()
      if (!type) {
        return { message: 'Veuillez remplir le champ' }
      }

      if (typeof type !== 'string') {
        return { message: 'Veuillez entrer une chaîne de caractère' }
      }

      incident.type = type
      await incident.save()
      return { message: "Modification de l'incident effectuée avec succès" }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async deleteIncident({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const incident = await Incident.findOrFail(id)
      if (!incident) {
        return { message: 'Incident introuvable' }
      }

      await incident.delete()
      return { message: 'Incident supprimé avec succès' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
