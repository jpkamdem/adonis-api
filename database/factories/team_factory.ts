import factory from '@adonisjs/lucid/factories'
import Team from '#models/team'
import { randomIntFromInterval } from '../../app/utils.js'
import { PlayerFactory } from './player_factory.js'

export const TeamFactory = factory
  .define(Team, async ({ faker }) => {
    return {
      name: faker.lorem.words(randomIntFromInterval(1, 3)),
    }
  })
  .relation('players', () => PlayerFactory)
  .build()
