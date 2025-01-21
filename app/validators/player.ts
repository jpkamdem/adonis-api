import vine from '@vinejs/vine'

export const createPlayerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3),
    lastName: vine.string().trim().minLength(3),
    number: vine.number().withoutDecimals().positive(),
    position: vine.enum(['gk', 'def', 'mf', 'fw']),
    teamId: vine.number().withoutDecimals().positive(),
  })
)
export const updatePlayerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).optional(),
    lastName: vine.string().trim().minLength(3).optional(),
    number: vine.number().withoutDecimals().positive().optional(),
    position: vine.enum(['gk', 'def', 'mf', 'fw']).optional(),
    teamId: vine.number().withoutDecimals().positive().optional(),
  })
)
