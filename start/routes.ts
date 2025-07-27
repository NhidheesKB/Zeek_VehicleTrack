import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const VehicleDetailsDashboardsController = () =>  import('#controllers/service_center_controllers/vehicleDetailsDashboardController')
const VehicleStatusesController = () =>  import('#controllers/service_center_controllers/vehicleStatusesController')
const ServiceCenterLoginsController = () =>  import('#controllers/service_center_controllers/serviceCenterLoginController')
const NewVehicleDetailsController = () =>  import('#controllers/service_center_controllers/newVehicleDetailsController')
const AddvehicledetailsController = () =>  import('#controllers/service_center_controllers/addVehicleDetailsController')
const ManualEntriesController = () =>  import('#controllers/service_center_controllers/manualEntriesController')
const CustomerAudioController=()=> import('#controllers/service_center_controllers/customerAudioController')

const CustomerLoginsController = () =>  import('#controllers/customer_controllers/customerLoginController')
const CustomerDashboardsController = () =>  import('#controllers/customer_controllers/customerDashboardController')

// ###################### Service Center Routes #############################

router.group(() => {
    router.get('/', [VehicleDetailsDashboardsController, 'dashboard']).as('vehicle_entry')
    router.get('/dashboard', [VehicleStatusesController, 'vehicle_status']).as('dashboard')
  }).as('admin')
  .prefix('/admin')
  .use(middleware.auth())

router.get('/login', async ({ view }) => {
    return view.render('pages/login')
  }).prefix('/admin')
  .as('admin.login')

router.post('/logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect().toRoute('admin.login')
  }).prefix('/admin')
  .as('logout')
  .use(middleware.auth())

router.group(() => {
    router.post('/login', [ServiceCenterLoginsController, 'servicecenterlogin']).as('log')
    router.post('/editvehicle', [NewVehicleDetailsController, 'newvehicledetails']).as('editvehicle')
    router
      .post('/addvdetails', [AddvehicledetailsController, 'addvehicledetails'])
      .as('addvehicledetails')
    router.post('/manualentry', [ManualEntriesController, 'manualentry']).as('manual')
    router.post('/upload',[CustomerAudioController,'customer_audio']).as('audio')
  })
  .prefix('/admin')
  .as('admin')

// ###################### Customer Routes #############################
router.group(() => {
    router.get('/login', async ({ view }) => {
        return view.render('pages/customer_login')
      }).as('login')
    router.group(() => {
        router.get('/dashboard', [CustomerDashboardsController, 'customer_dashboard']).as('dashboard')
      }).use(middleware.auth({ guards: ['customer'] }))
  })
  .as('customer')

router.post('/login', [CustomerLoginsController, 'customer_login']).as('customer_login')
