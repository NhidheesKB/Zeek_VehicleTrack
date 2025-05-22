let lastPlateNumber:string
const numberplate = {
  set(plate:string) {
    lastPlateNumber = plate
  },
  get() {
    return lastPlateNumber? lastPlateNumber.toUpperCase():null
  }
}

export default numberplate