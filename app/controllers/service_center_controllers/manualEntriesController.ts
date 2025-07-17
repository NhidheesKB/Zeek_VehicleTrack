import { HttpContext } from '@adonisjs/core/http'
import UserDetail from '#models/user_detail'
import user_details from '#service/userDetails'
import VehicleEntry from '#models/vehicle_entry'
import VehicleDetail from '#models/vehicle_rc_details'
import { vehicle_entry_validator } from '#validators/validator'
import { Vehicle_details_interface } from '#interfaces/completeInterfaces'
export default class ManualEntriesController {
  public async manualentry({ request, response }: HttpContext) {
    const body = await request.validateUsing(vehicle_entry_validator)
    // console.log('mentrybody', body)
    try {
      const user = await UserDetail.updateOrCreate(
        { vehicle_no: body.bikenumber.toUpperCase() },
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
      const dbdata = {
        vehicle_no: body.bikenumber.toUpperCase(),
        owner_name: body.owner_name,
        colour: body.bikecolor,
        insurance_validity: body.vin_validity,
        model: body.bikemodel,
        manufacturer: body.bikemanufacturer,
      }
      await VehicleEntry.create(data)
      await VehicleDetail.updateOrCreate({ vehicle_no: body.bikenumber.toUpperCase() }, dbdata)
      return response.redirect().toRoute('admin.vehicle_entry')
    } catch (error) {
      console.log(error)
    }
  }
}
