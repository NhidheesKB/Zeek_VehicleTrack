import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const VehicleDetailsDashboardsController = () =>import('#controllers/vehicle_details_dashboards_controller')
const VehicleStatusesController = () => import('#controllers/vehicle_statuses_controller')
const ServiceCenterLoginsController = () => import('#controllers/service_center_logins_controller')
const NewVehicleDetailsController = () => import('#controllers/new_vehicle_details_controller')

router
  .group(() => {
    router.get('/', [VehicleDetailsDashboardsController, 'dashboard'])
    router.get('/dashboard', [VehicleStatusesController, 'vehicle_status'])
  })
  .use(middleware.auth())

router.post('/login', [ServiceCenterLoginsController, 'servicecenterlogin']).as('login')
router.get('/login', async ({ view }) => {
  return view.render('pages/login')
})

router.post('/newvehicle', [NewVehicleDetailsController, 'newvehicledetails']).as('newvehicle')