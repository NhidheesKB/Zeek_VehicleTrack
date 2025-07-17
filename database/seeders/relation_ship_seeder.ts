import UserDetail from '#models/user_detail'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
  const userDetail=await UserDetail.query().where('vehicle_no','TN36AB8596').preload('VehicleDetail').first()
    console.log(userDetail);
    console.log("join",userDetail?.VehicleDetail)
    // console.log(userDetail[6]);
  }
}