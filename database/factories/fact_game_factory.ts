import factory from '@adonisjs/lucid/factories'
import FactGame from '#models/fact_game'
import { randomIntFromInterval } from '../../app/utils.js'
import { TeamFactory } from './team_factory.js'

export const FactGameFactory = factory
  .define(FactGame, async () => {
    return {
      homeTeamId: randomIntFromInterval(1, 10),
      awayTeamId: randomIntFromInterval(1, 10),
      homeScore: randomIntFromInterval(1, 5),
      awayScore: randomIntFromInterval(1, 5),
    }
  })
  .relation('firstTeamId', () => TeamFactory)
  .relation('secondTeamId', () => TeamFactory)
  .build()
