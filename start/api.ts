import router from "@adonisjs/core/services/router";
const AutomaticEntriesController =()=> import('#controllers/service_center_controllers/automaticEntriesController')
const VehicleStatusUpdatesController=()=> import('#controllers/service_center_controllers/vehicleStatusUpdatesController')
router.group(()=>{
    router.post('/update-esp1',[AutomaticEntriesController,'platenum'])
    router.post('/update',[VehicleStatusUpdatesController,'vehiclestatus'])
}).prefix('/api');
