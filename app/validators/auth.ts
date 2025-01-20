import vine from '@vinejs/vine'

export const registerUserValidation = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).alphaNumeric(),
    email: vine
      .string()
      .email()
      .trim()
      .unique(async (db, value) => {
        const users = await db.from('users').where('email', value).first()
        return !users
      }),
    password: vine.string().minLength(8),
  })
)

export const loginUserValidation = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().minLength(8),
  })
)
