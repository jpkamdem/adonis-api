import vine from '@vinejs/vine'

export const userUpdateValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().optional(),
    username: vine.string().trim().minLength(4).alphaNumeric().optional(),
    password: vine.string().minLength(8).optional(),
  })
)
