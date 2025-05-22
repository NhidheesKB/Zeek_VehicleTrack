const new_vehicle_entry= (body:any,userid:number)=>{
    return{
      user_id:userid,
      vehicle_no:body.bikenumber,
      services:body.service_list.toString(),
      service_status:"Status 1",
      estimated_completion:body.estimated_completion,
      assigned_technician:body.assigned_technician.toString(),
      service_notes:body.service_notes

    }
} 
export default new_vehicle_entry