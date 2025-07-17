import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import VehicleDetail from './vehicle_rc_details.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import VehicleEntry from './vehicle_entry.js'

export default class UserDetail extends BaseModel {
  public static table = 'user_details'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vehicle_no: string
  @belongsTo(() => VehicleEntry, {
    foreignKey: 'vehicle_no',
    localKey: 'vehicle_no',
  })
  declare VehicleEntry: BelongsTo<typeof VehicleEntry>


  @belongsTo(() => VehicleDetail, {
    foreignKey: 'vehicle_no',
    localKey: 'vehicle_no',
  })
  declare VehicleDetail: BelongsTo<typeof VehicleDetail>

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

  static async verifyCredentials(vehicle_no: string, phone_number: string) {
    return await UserDetail.query()
      .where('vehicle_no', vehicle_no)
      .andWhere('phone_number', phone_number)
      .first()
  }
}
