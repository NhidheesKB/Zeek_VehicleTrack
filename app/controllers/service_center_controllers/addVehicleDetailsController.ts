import { HttpContext } from '@adonisjs/core/http'
import VehicleDetail from '#models/vehicle_rc_details'
import router from '@adonisjs/core/services/router'
import { add_vehicle_details_validator } from '#validators/validator'
export default class AddvehicledetailsController {
  public async addvehicledetails({ request, view }: HttpContext) {
    const body = await request.validateUsing(add_vehicle_details_validator)
    try {
      const vehicle = await VehicleDetail.findBy('vehicle_no', body.vehicle_no)
      const url = router.builder().make('admin.editvehicle')
      return view.render('pages/home', {
        bikemanufacturer: vehicle?.manufacturer,
        bikemodel: body.model,
        bikecolor: vehicle?.colour,
        bikenumber: body.vehicle_no,
        vin_validity: vehicle?.insurance_validity,
        owner_name: body.owner_name,
        route: url,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
