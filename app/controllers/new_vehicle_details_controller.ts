import type { HttpContext } from '@adonisjs/core/http'
import UserDetail from '#models/user_detail'
import new_vehicle_entry from '../../service/new_vehicle_entry.js'
import user_details from '../../service/user_details.js'
import VehicleEntry from '#models/vehicle_entry'
export default class NewVehicleDetailsController {
  public async newvehicledetails({ request, response }: HttpContext) {
    const body = request.body()
    if (body.licencenumber) {
      console.log('The correct number is', body.licencenumber)
    }
    if (body.bikemanufacturer === 'N/A' || body.bikemodel === 'N/A' || body.bikenumber === 'N/A') {
      return response.redirect('/')
    }
    const newuser = await UserDetail.updateOrCreate(
      { vehicle_no: body.bikenumber },
      user_details(body)
    )
    await VehicleEntry.create(new_vehicle_entry(body,newuser.$original.id))   
    return response.redirect('/')
  }
}
