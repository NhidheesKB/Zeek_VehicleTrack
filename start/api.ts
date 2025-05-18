import router from "@adonisjs/core/services/router";
const ServicedashboardsController =()=> import('#controllers/servicedashboards_controller');

router.group(()=>{
    router.post('/update-esp1',[ServicedashboardsController,'platenum'])
}).prefix('/api');