import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(255),
    content: vine.string().trim(),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(255).optional(),
    content: vine.string().trim().optional(),
  })
)
