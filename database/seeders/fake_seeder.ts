import { PlayerFactory } from '#database/factories/player_factory'
import { PostFactory } from '#database/factories/post_factory'
import { TeamFactory } from '#database/factories/team_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await UserFactory.with('posts').createMany(25)
    await PostFactory.createMany(99)
    await TeamFactory.with('players').createMany(10)
    await PlayerFactory.createMany(70)
  }
}
