import type { HttpContext } from '@adonisjs/core/http'
import numberplate from '../../service/numberplate.js'
import VehicleDetail from '#models/vehicle_rc_details'
import platedetails from '../../service/platedetails.js'

export default class VehicleDetailsDashboardsController {
    public async dashboard({view}:HttpContext){
        // console.log("from new",numberplate.get())
        if(numberplate.get()===null){
            return view.render('pages/home')
        }
        const vehicledata= await VehicleDetail.findBy('vehicle_no',numberplate.get())
        const numberdata=platedetails(vehicledata);
        // console.log("numberdata",numberdata);
        return view.render('pages/home',
            {
                bikemanufacturer:numberdata.manufacturer,
                bikemodel:numberdata.model,
                bikecolor:numberdata.color,
                bikenumber:numberdata.numberplate,
                vin_validity:numberdata.insurance_validity,
                owner_name:numberdata.owner_name
            })
    }

}