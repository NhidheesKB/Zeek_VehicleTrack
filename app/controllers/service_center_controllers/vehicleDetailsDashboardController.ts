import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

export default class VehicleDetailsDashboardsController {
  public async dashboard({ view }: HttpContext) {
    const url = router.builder().make('admin.manual')

    return view.render('pages/home', { route: url })
  }
}
