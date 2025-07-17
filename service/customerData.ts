import UserDetail from '#models/user_detail'
import { DateTime } from 'luxon';
export function customer_data(user: UserDetail) {
  const createdAtUTC = user.VehicleEntry.createdAt.toISO()as string; 
  
  return {
    register_no: user.vehicle_no,
    owner_name: user.name,
    owner_number: user.phone_number,
    email: user.email,
    address: user.address,
    model: user.VehicleDetail.model,
    arrived_time: DateTime
      .fromISO(createdAtUTC, { zone: 'utc' })       
      .setZone('Asia/Kolkata')                     
      .toFormat('dd/LL/yyyy, hh:mm:ss a'), 
    services: user.VehicleEntry.services.split(','),
    service_notes: user.VehicleEntry.service_notes,
    service_status: user.VehicleEntry.service_status,
    estimated_completion: user.VehicleEntry.estimated_completion,
    assigned_technician: user.VehicleEntry.assigned_technician,
  }
}
