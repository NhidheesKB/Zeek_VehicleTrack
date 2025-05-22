import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class ServiceCenterLoginsController {
  public async servicecenterlogin({ request, response, auth,session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const verifyuser = await User.findBy('email', email)
    if (!verifyuser) {
      session.flash("error","Invalid email")
      return response.redirect('/login');
    }
    try {
      const user = await User.verifyCredentials(email, password)
      if (user) {
        await auth.use('web').login(user)
        response.redirect('/')
      }
    } catch (error) {
      session.flash('error', 'Wrong Password');
      return response.redirect('/login')
    }
  }
}
