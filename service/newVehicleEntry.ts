import { Vehicle_details_interface } from "#interfaces/completeInterfaces"

const new_vehicle_entry= (body:Vehicle_details_interface,userid:number)=>{
    return{
      user_id:userid,
      vehicle_no:body.bikenumber,
      services:body.services.toString(),
      service_status:"Status 1",
      estimated_completion:body.estimated_completion,
      assigned_technician:body.assigned_technician.toString(),
      service_notes:body.service_notes

    }
}
export default new_vehicle_entry
