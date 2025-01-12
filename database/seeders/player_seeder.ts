import Player from '#models/player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Player.createMany([
      {
        firstName: 'micheal',
        lastName: 'kaiser',
        number: 9,
        teamId: 1,
        position: 'fw',
      },
      {
        firstName: 'reo',
        lastName: 'mikage',
        number: 8,
        teamId: 2,
        position: 'def',
      },
      {
        firstName: 'meguru',
        lastName: 'bachira',
        number: 7,
        teamId: 3,
        position: 'def',
      },
      {
        firstName: 'oliver',
        lastName: 'aiku',
        number: 4,
        teamId: 4,
        position: 'def',
      },
      {
        firstName: 'charles',
        lastName: 'chevalier',
        number: 6,
        teamId: 5,
        position: 'def',
      },
    ])
  }
}
