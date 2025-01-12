import Incident from '#models/incident'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Incident.createMany([
      { type: 'Ligament croisé' },
      { type: 'Fracture du péroné' },
      { type: 'Traumatisme cranien' },
      { type: 'Hemorragie interne' },
    ])
  }
}
