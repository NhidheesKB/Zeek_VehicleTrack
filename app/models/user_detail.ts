import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserDetail extends BaseModel {
  public static table = 'user_details'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vehicle_no:string

  @column()
  declare name: string
  
  @column()
  declare phone_number: string

  @column()
  declare email: string

  @column()
  declare address: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
