import type { HttpContext } from '@adonisjs/core/http'
import VehicleEntry from '#models/vehicle_entry'

export default class VehicleStatusUpdatesController {
  public async vehiclestatus({ request }: HttpContext) {
    const status = request.input('status', 'status 1')
    const vehicle_no = request.input('vehicle_no').toUpperCase()
    try {
       await VehicleEntry.query()
        .where('vehicle_no', vehicle_no)
        .orderBy('created_at', 'desc')
        .update('service_status',status)
    } catch (error) {
      console.log(error)
    }
  }

}
