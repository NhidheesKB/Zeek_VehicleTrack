import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { admin_login_validator } from '#validators/validator'
export default class ServiceCenterLoginsController {
  public async servicecenterlogin({ request, response, auth,session }: HttpContext) {
    const { email, password } = await request.validateUsing(admin_login_validator)
    const verifyuser = await User.findBy('email', email)
    if (!verifyuser) {
      session.flash("error","Invalid email")
      return response.redirect().toRoute('admin.login')
    }
    try {
      const user = await User.verifyCredentials(email, password)
      if (user) {
        await auth.use('web').login(user)
        // response.redirect('/dashboard')
        return response.redirect().toRoute('admin.dashboard')
      }
    } catch (error) {
      session.flash('error', 'Wrong Password');
      // return response.redirect('/login')
      return response.redirect().toRoute('admin.login')
    }
  }
}
