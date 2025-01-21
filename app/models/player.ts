import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Team from './team.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Incident from './incident.js'
import type { Position, Status } from '../enum.js'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare teamId: number

  @column()
  declare number: number

  @column()
  declare position: Position

  @column()
  declare status: Status

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @manyToMany(() => Incident)
  declare incidents: ManyToMany<typeof Incident>
}
