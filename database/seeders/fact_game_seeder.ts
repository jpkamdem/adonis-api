import { FactGameFactory } from '#database/factories/fact_game_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await FactGameFactory.createMany(30)
  }
}
