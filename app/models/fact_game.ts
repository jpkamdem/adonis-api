import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Team from './team.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class FactGame extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare homeTeamId: number

  @column()
  declare awayTeamId: number

  @column()
  declare homeScore: number

  @column()
  declare awayScore: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Team, {
    localKey: 'id',
    foreignKey: 'homeTeamId',
  })
  declare firstTeamId: BelongsTo<typeof Team>

  @belongsTo(() => Team, {
    localKey: 'id',
    foreignKey: 'awayTeamId',
  })
  declare secondTeamId: BelongsTo<typeof Team>
}
