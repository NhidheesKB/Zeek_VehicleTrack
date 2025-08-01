import vine from '@vinejs/vine'

export const customer_login_validator = vine.compile(
  vine.object({
    vehicle_no: vine.string().trim().maxLength(10),
    phone_number: vine.string().trim().mobile(),
  })
)

export const admin_login_validator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim(),
  })
)
export const add_vehicle_details_validator = vine.compile(
  vine.object({
    model: vine.string().trim(),
    vehicle_no: vine.string().trim().maxLength(10),
    owner_name: vine.string().trim(),
    phone_no: vine.string().trim(),
    estimated_completion: vine.string().trim().maxLength(10).optional(),
  })
)

export const vehicle_entry_validator = vine.compile(
  vine.object({
    bikemanufacturer: vine.string().trim().optional(),
    bikemodel: vine.string().trim(),
    bikecolor: vine.string().trim(),
    bikenumber: vine.string().trim().maxLength(10),
    vin_validity: vine.string().trim().optional(),
    owner_name: vine.string().trim(),
    phone_number: vine.string().trim().mobile(),
    email: vine.string().email().optional(),
    address: vine.string().trim(),
    services: vine.unionOfTypes([vine.string().trim(),vine.array(vine.string().trim())]),
    estimated_completion: vine.string().maxLength(10).trim(),
    assigned_technician: vine.unionOfTypes([vine.string().trim(),vine.array(vine.string().trim())]),
    service_notes: vine.string().trim(),
  })
)

export const audio_validator=vine.compile(
  vine.object({
    recorder:vine.file({
      extnames:['webm'],
    }),
    language:vine.string().fixedLength(2).trim()
  })
)
