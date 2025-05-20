import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class ServiceCenterLoginsController {
  public async servicecenterlogin({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const verifyuser = await User.findBy('email', email)
    if (!verifyuser) {
      return response.abort('Wrong Email');
    }
    try {
      const user = await User.verifyCredentials(email, password)
      if (user) {
        // console.log(user)
        await auth.use('web').login(user)
         response.redirect('/')
      }
    } catch (error) {
      return response.status(404).json({ message: 'Invalid Credentails' })
      // response.redirect('/login')
    }
  }
}
