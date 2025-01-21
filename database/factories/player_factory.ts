import factory from '@adonisjs/lucid/factories'
import Player from '#models/player'
import { Position } from '../../app/enum.js'
import { randomIntFromInterval } from '../../app/utils.js'
import { TeamFactory } from './team_factory.js'
import Incident from '#models/incident'

const posArray: [Position, Position, Position, Position] = ['gk', 'def', 'mf', 'fw']

export const PlayerFactory = factory
  .define(Player, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      number: randomIntFromInterval(1, 99),
      position: posArray[randomIntFromInterval(0, posArray.length)],
      teamId: randomIntFromInterval(1, 10),
    }
  })
  .relation('team', () => TeamFactory)
  .relation('incidents', () => Incident)
  .build()
