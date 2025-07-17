import type { HttpContext } from '@adonisjs/core/http'
import UserDetail from '#models/user_detail'
import user_details from '#service/userDetails'
import VehicleEntry from '#models/vehicle_entry'
import { Vehicle_details_interface } from '#interfaces/completeInterfaces'
import { vehicle_entry_validator } from '#validators/validator'

export default class NewVehicleDetailsController {
  public async newvehicledetails({ request, response }: HttpContext) {
    const body = await request.validateUsing(vehicle_entry_validator)
    try {
      const user = await UserDetail.updateOrCreate(
        { vehicle_no: body.bikenumber },
        user_details(body as Vehicle_details_interface)
      )
      const data = {
        user_id: user.id,
        vehicle_no: user.vehicle_no,
        services: body.services.toString(),
        service_status: 'Status 1',
        assigned_technician: body.assigned_technician.toString(),
        estimated_completion: body.estimated_completion,
        service_notes: body.service_notes,
      }
      const edit_vehicle_entry = await VehicleEntry.query()
        .where('vehicle_no', body.bikenumber)
        .orderBy('created_at', 'desc')
        .first()
      edit_vehicle_entry && (await edit_vehicle_entry.merge(data).save())
      // return response.redirect('/')
      return response.redirect().toRoute('admin.vehicle_entry')
    } catch (error) {
      response.json({sucess:false,error})
    }
  }
}
