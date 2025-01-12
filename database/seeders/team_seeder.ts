import Team from '#models/team'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Team.createMany([
      { name: 'Bastard Munchen' },
      { name: 'Manshine City' },
      { name: 'FC Barcha' },
      { name: 'Ubers' },
      { name: 'Paris X Gen' },
    ])
  }
}
