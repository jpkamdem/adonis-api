import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import { randomIntFromInterval } from '../../app/utils.js'
import { UserFactory } from './user_factory.js'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      userId: randomIntFromInterval(1, 25),
      title: faker.lorem.words(randomIntFromInterval(1, 3)),
      content: faker.lorem.paragraph(),
    }
  })
  .relation('user', () => UserFactory)
  .build()
