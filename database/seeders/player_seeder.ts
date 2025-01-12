import Player from '#models/player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Player.createMany([
      {
        first_name: 'micheal',
        last_name: 'kaiser',
        number: 9,
        teamId: 1,
        position: 'fw',
      },
      {
        first_name: 'reo',
        last_name: 'mikage',
        number: 8,
        teamId: 2,
        position: 'mf',
      },
      {
        first_name: 'meguru',
        last_name: 'bachira',
        number: 7,
        teamId: 3,
        position: 'mf',
      },
      {
        first_name: 'oliver',
        last_name: 'aiku',
        number: 4,
        teamId: 4,
        position: 'def',
      },
      {
        first_name: 'charles',
        last_name: 'chevalier',
        number: 6,
        teamId: 5,
        position: 'mf',
      },
    ])
  }
}
