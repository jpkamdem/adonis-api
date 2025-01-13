import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fact_games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('home_team_id').unsigned().references('teams.id').notNullable()
      table.integer('away_team_id').unsigned().references('teams.id').notNullable()
      table.integer('home_score').unsigned().notNullable()
      table.integer('away_score').unsigned().notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
