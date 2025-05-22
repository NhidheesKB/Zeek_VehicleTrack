import router from "@adonisjs/core/services/router";
const ServicedashboardsController =()=> import('#controllers/servicedashboards_controller');
const VehicleStatusUpdatesController=()=> import('#controllers/vehicle_status_updates_controller')
router.group(()=>{
    router.post('/update-esp1',[ServicedashboardsController,'platenum'])
    router.post('/update',[VehicleStatusUpdatesController,'vehiclestatus'])
}).prefix('/api');