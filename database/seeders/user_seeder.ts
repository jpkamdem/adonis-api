import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      { email: 'john.doe@gmail.com', username: 'john', password: 'johndoe' },
      { email: 'jane.doe@gmail.com', username: 'jane', password: 'janedoe' },
      { email: 'jester.doe@gmail.com', username: 'jester', password: 'jesterdoe' },
    ])
  }
}
