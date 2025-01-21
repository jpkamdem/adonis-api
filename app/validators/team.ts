import vine from '@vinejs/vine'

export const createTeamValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .alphaNumeric({ allowSpaces: true, allowDashes: true, allowUnderscores: false }),
  })
)
