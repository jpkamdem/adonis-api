import factory from '@adonisjs/lucid/factories'
import Team from '#models/team'
import { randomIntFromInterval } from '../../app/utils.js'

export const TeamFactory = factory
  .define(Team, async ({ faker }) => {
    return {
      name: faker.lorem.words(randomIntFromInterval(1, 3)),
    }
  })
  .build()
