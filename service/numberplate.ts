let lastPlateNumber:any=null
const numberplate = {
  set(plate:any) {
    lastPlateNumber = plate
  },
  get() {
    return lastPlateNumber? lastPlateNumber.toUpperCase():null
  }
}

export default numberplate