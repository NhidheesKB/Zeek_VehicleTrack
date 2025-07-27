import vine from '@vinejs/vine'

export const customer_login_validator = vine.compile(
  vine.object({
    vehicle_no: vine.string().trim().maxLength(10),
    phone_number: vine.string().mobile(),
  })
)

export const admin_login_validator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
export const add_vehicle_details_validator = vine.compile(
  vine.object({
    model: vine.string(),
    vehicle_no: vine.string().trim().maxLength(10),
    owner_name: vine.string(),
    phone_no: vine.string(),
    estimated_completion: vine.string().maxLength(10).optional(),
  })
)

export const vehicle_entry_validator = vine.compile(
  vine.object({
    bikemanufacturer: vine.string().optional(),
    bikemodel: vine.string(),
    bikecolor: vine.string(),
    bikenumber: vine.string().maxLength(10),
    vin_validity: vine.string().optional(),
    owner_name: vine.string(),
    phone_number: vine.string().mobile(),
    email: vine.string().email().optional(),
    address: vine.string(),
    services: vine.unionOfTypes([vine.string(),vine.array(vine.string())]),
    estimated_completion: vine.string().maxLength(10),
    assigned_technician: vine.unionOfTypes([vine.string(),vine.array(vine.string())]),
    service_notes: vine.string(),
  })
)

export const audio_validator=vine.compile(
  vine.object({
    recorder:vine.file({
      extnames:['webm'],
    }),
    language:vine.string().fixedLength(2)
  })
)
