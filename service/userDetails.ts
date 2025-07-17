import { Vehicle_details_interface } from "#interfaces/completeInterfaces"

const user_details = (body:Vehicle_details_interface) => {
  return {
    vehicle_no: body.bikenumber,
    name: body.owner_name,
    phone_number: body.phone_number,
    email: body.email,
    address: body.address,
  }
}
export default user_details
