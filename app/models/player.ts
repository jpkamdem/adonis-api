import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { Position, Status } from '../enums.js'

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
}
