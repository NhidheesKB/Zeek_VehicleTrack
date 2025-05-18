import router from '@adonisjs/core/services/router'
const VehicleDetailsDashboardsController=()=> import('#controllers/vehicle_details_dashboards_controller');
const VehicleStatusesController=()=> import('#controllers/vehicle_statuses_controller');

router.get('/',[VehicleDetailsDashboardsController,'dashboard'])

router.get('/dashboard',[VehicleStatusesController,'vehicle_status'])

// router.on('/').render('pages/home')
