import { DateTime } from 'luxon'
import { BaseModel,column } from '@adonisjs/lucid/orm'
export default class VehicleDetail extends BaseModel {
  public static table = 'vehicle_rc_details'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vehicle_no: string
  @column()
  declare owner_name: string

  @column()
  declare colour: string

  @column()
  declare insurance_validity: string

  @column()
  declare model: string

  @column()
  declare manufacturer:string

  @column()
  declare chassis_number: string

  @column()
  declare puc_number_upto: string

  @column()
  declare api_details: Record<string,any>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
