import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class VehicleEntry extends BaseModel {
  public static table='vehicle_entries'

  @column()
  declare id: number

  @column({isPrimary:true})
  declare user_id: number

  @column()
  declare vehicle_no: string

  @column()
  declare services: string
  @column()
  declare service_status:string

  @column()
  declare estimated_completion: string

  @column()
  declare assigned_technician: string

  @column()
  declare service_notes: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
