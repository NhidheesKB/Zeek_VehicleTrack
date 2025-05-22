const   user_details = (body: any) => {
  return {
    vehicle_no: body.bikenumber,
    name: body.owner_name,
    phone_number: body.phone_number,
    email: body.email,
    address: body.address,
  }
}
export default user_details
