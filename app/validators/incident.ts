import vine from '@vinejs/vine'

export const createIncidentValidator = vine.compile(
  vine.object({
    type: vine.string().trim(),
  })
)
