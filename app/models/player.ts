import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare teamId: number

  @column()
  declare number: number

  @column()
  declare position: 'gk' | 'def' | 'mf' | 'fw'

  @column()
  declare status: 'opérationnel' | 'blessé' | 'suspendu' | 'inconnu'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
