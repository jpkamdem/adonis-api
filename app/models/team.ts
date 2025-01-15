import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Player from './player.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import FactGame from './fact_game.js'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare wins: number

  @column()
  declare loses: number

  @column()
  declare draws: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Player)
  declare players: HasMany<typeof Player>

  @hasOne(() => FactGame, {
    localKey: 'id',
    foreignKey: 'homeTeamId',
  })
  declare firstTeam: HasOne<typeof FactGame>

  @hasOne(() => FactGame, {
    localKey: 'id',
    foreignKey: 'awayTeamId',
  })
  declare secondTeam: HasOne<typeof FactGame>
}
