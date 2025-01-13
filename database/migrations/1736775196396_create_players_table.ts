import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.integer('team_id').unsigned().references('teams.id').notNullable().onDelete('CASCADE')
      table.integer('number', 2).unsigned().notNullable()
      table.enu('position', ['gk', 'def', 'mf', 'fw']).notNullable()
      table
        .enu('status', ['opérationnel', 'blessé', 'suspendu', 'inconnu'])
        .defaultTo('opérationnel')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
