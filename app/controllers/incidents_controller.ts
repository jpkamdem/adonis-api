import type { HttpContext } from '@adonisjs/core/http'
import { extractErrorMessage } from '../utils.js'
import Incident from '#models/incident'
import { createIncidentValidator } from '#validators/incident'

export default class IncidentsController {
  async getAllIncidents({ response }: HttpContext) {
    try {
      const incidents = await Incident.all()
      if (!incidents) {
        return response.abort({ message: 'Erreur lors de la récupération des incidents' })
      }

      return response.status(200).json(incidents)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async getIncidentById({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const incident = await Incident.findOrFail(id)
      if (!incident) {
        return response.abort({ message: 'Incident introuvable' })
      }

      return response.status(200).json(incident)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async createIncident({ request, response }: HttpContext) {
    try {
      const { type } = await request.validateUsing(createIncidentValidator)

      const incident = new Incident()
      incident.type = type
      await incident.save()
      return response.status(201).json({ message: 'Incident créé avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async updateIncident({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const incident = await Incident.findOrFail(id)
      if (!incident) {
        return response.abort({ message: 'Incident introuvable' })
      }

      const { type } = await request.validateUsing(createIncidentValidator)

      incident.type = type
      await incident.save()
      return response
        .status(201)
        .json({ message: "Modification de l'incident effectuée avec succès" })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async deleteIncident({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const incident = await Incident.findOrFail(id)
      if (!incident) {
        return response.abort({ message: 'Incident introuvable' })
      }

      await incident.delete()
      return response.status(204).json({ message: 'Incident supprimé avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }
}
