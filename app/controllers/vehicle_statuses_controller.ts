import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';
import db from '@adonisjs/lucid/services/db';
import todayvehicle from '../../service/todayvehicles.js'
export default class VehicleStatusesController {
    public async vehicle_status({view}:HttpContext){
        const today=DateTime.local().startOf('day').toSQL();
        const previous=DateTime.local().plus({ days: 1 }).startOf('day').toSQL()
        const today_vehicle=await db.from('vehicle_rc_details').whereBetween('created_at',[today,previous]).orderBy('id','desc')
        const today_collection=today_vehicle
        // console.log("Today_cooll length",today_collection.length)
        const today_count=today_collection.length
        // const today_count=await db.from('vehicle_rc_details').whereBetween('created_at',[today,previous]).count('* as total')
        const today_data=today_collection.map(todayvehicle);
        // console.log("Todayvehicle",today_data);
        // console.log("Todaycount",today_count[0].total);
        return view.render('pages/dashboard',{
            values:today_data,
            today_count:today_count,
            status:"0"
        });
    }
}