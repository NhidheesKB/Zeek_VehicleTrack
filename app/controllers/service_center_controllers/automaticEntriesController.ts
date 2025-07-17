import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import collect from 'collect.js'
import getconfig from '#config/getconfig'
import postconfig from '#config/postconfig'
import numberdata from '#service/numberdata'
import VehicleDetail from '#models/vehicle_rc_details'
import UserDetail from '#models/user_detail'
import VehicleEntry from '#models/vehicle_entry'
export default class AutomaticEntriesController {
  public async platenum({ request, response }: HttpContext) {
    const { platenumber }: any = request.body()
    console.log(`plate numberis ${platenumber}`)
    if (!platenumber) {
      return response.status(404).json({ sucess: false, message: 'Then number is not detected' })
    }
    const datas = numberdata(platenumber)

    try {
      const config = postconfig(datas)
      const response = (await axios(config)).data
      setTimeout(async () => {
        try {
          const getresponse = (await axios(getconfig(response.request_id))).data
          console.log('getresponse', getresponse)
          const collection:any = collect(getresponse)
          // console.log("collecetion extra",collection.items[0].result.extraction_output)
          const collresult = collection.first()?.result?.extraction_output
          console.log(collresult)
          const dbdata = {
            vehicle_no: collresult?.registration_number,
            owner_name: collresult?.owner_name,
            colour: collresult?.color,
            insurance_validity: collresult?.insurance_validity,
            model: collresult?.maker_model,
            manufacturer: collresult?.manufacturer,
            chassis_number: collresult?.chassis_number,
            puc_number_upto: collresult?.puc_number_upto,
            api_details: collresult,
          }
          await VehicleDetail.updateOrCreate(
            { vehicle_no: collresult?.registration_number },
            dbdata
          )

          const newuser = await UserDetail.updateOrCreate(
            { vehicle_no: dbdata.vehicle_no },
            { name: dbdata.owner_name }
          )
          await VehicleEntry.create({ user_id: newuser.id, vehicle_no: newuser.vehicle_no })
        } catch (error) {
          console.log('settimeout error', error)
        }
      }, 10000)
    } catch (error) {
      return response.status(500).json({ success: false, error: error.data })
    }
  }
}
