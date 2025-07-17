import type { HttpContext } from '@adonisjs/core/http'
import VehicleEntry from '#models/vehicle_entry'

export default class VehicleStatusUpdatesController {
  public async vehiclestatus({ request }: HttpContext) {
    const status = request.input('status', 'status1')
    const vehicle_no = request.input('vehicle_no').toUpperCase()
    try {
      const newentry = await VehicleEntry.query()
        .where('vehicle_no', vehicle_no)
        .orderBy('created_at', 'desc')
        .firstOrFail()
      newentry.service_status = status
      await newentry.save()
    } catch (error) {
      console.log(error)
    }
  }

}
