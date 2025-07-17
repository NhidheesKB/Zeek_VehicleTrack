import { HttpContext } from '@adonisjs/core/http'
import UserDetail from '#models/user_detail'
import { customer_login_validator } from '#validators/validator'
export default class CustomerLoginsController {
  public async customer_login({ request, response, session,auth }: HttpContext) {
    const {vehicle_no,phone_number}=await request.validateUsing(customer_login_validator)
    try {
      const customer = await UserDetail.verifyCredentials(
        vehicle_no?.trim().toUpperCase(),
        phone_number?.trim()
      )
      if (!customer) {
        session.flash('cuserror', 'Enter Correct Vehicle Number and Phone Number')
        return response.redirect().toRoute('customer.login')
      }
      session.regenerate()
      await auth.use('customer').login(customer)
      session.put('vehicle_no',vehicle_no.trim().toUpperCase())
      return response.redirect().toRoute('customer.dashboard')

    } catch (error) {
       session.flash('cuserror', 'Something went wrong. Please try again.')
      return response.redirect().toRoute('customer.login')
    }
  }
}
