import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import { todayvehicles } from '../../../service/todayVehicles.js'
export default class VehicleStatusesController {
  public async vehicle_status({ view }:HttpContext) {
    const today = DateTime.local().startOf('day').toSQL()
    const tomorrow = DateTime.local().plus({ days: 1 }).startOf('day').toSQL()
    try {
      const joindata = await db
        .from('user_details')
        .join('vehicle_entries', 'user_details.id', '=', 'vehicle_entries.user_id')
        .join(
          'vehicle_rc_details',
          'vehicle_rc_details.vehicle_no',
          '=',
          'vehicle_entries.vehicle_no'
        )
        .whereBetween('vehicle_entries.created_at', [today, tomorrow])
        .orderBy('vehicle_entries.id', 'desc')
      const today_data = joindata.map(todayvehicles)
      let today_count = 0,
        today_pending_count = 0,
        today_completed = 0
      today_data.forEach((data) => {
        if (data.service_status !== 'Status 4') {
          today_pending_count++
        } else {
          today_completed++
        }
        today_count++
      })
      return view.render('pages/dashboard', {
        values: today_data,
        today_count,
        today_pending_count,
        today_completed,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
