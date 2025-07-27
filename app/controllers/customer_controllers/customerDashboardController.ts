import UserDetail from '#models/user_detail'
import type { HttpContext } from '@adonisjs/core/http'
import { customer_data } from '#service/customerData'
export default class CustomerDashboardsController {
  public async customer_dashboard({ session, view,response }: HttpContext) {
    const vehicle_no = session.get('vehicle_no')
    try {
      const join_data = await UserDetail.query()
        .where('vehicle_no', vehicle_no)
        .preload('VehicleEntry',(query)=>{query.orderBy('id','desc')})
        .preload('VehicleDetail')
      const vehicles = join_data.map(customer_data)
      const statusMap: { [key: string]: string[] } = {
        'Status 1': ['Vehicle Received'],
        'Status 2': ['Vehicle Received', 'Initial Inspection'],
        'Status 3': ['Vehicle Received', 'Initial Inspection', 'Service in Progress'],
        'Status 4': ['Vehicle Received','Initial Inspection','Service in Progress','Ready For Pickup'],
      }
      const checkbox = statusMap[vehicles[0].service_status] || []
      return view.render('pages/customerdash', { vehicles, checkbox })

    } catch (error) {
      console.log('error', error)
      return response.redirect().toRoute('customer.login')
    }
  }
}
