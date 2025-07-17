interface types {
  $original: {
    owner_name: string
    manufacturer: string
    model: string
    colour: string
    vehicle_no: string
    insurance_validity: string
  }
}
const platedetails = (vehicledata: types) => {
  return {
    owner_name: vehicledata?.$original.owner_name,
    manufacturer: vehicledata?.$original.manufacturer,
    model: vehicledata?.$original.model,
    color: vehicledata?.$original.colour,
    numberplate: vehicledata?.$original.vehicle_no,
    insurance_validity: vehicledata?.$original.insurance_validity,
  }
}
export default platedetails
