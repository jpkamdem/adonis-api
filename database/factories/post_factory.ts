import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import { randomIntFromInterval } from '../../app/utils.js'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      authorId: randomIntFromInterval(1, 25),
      title: faker.lorem.words(randomIntFromInterval(1, 3)),
      content: faker.lorem.paragraph(),
    }
  })
  .build()
