import factory from '@adonisjs/lucid/factories'
import FactGame from '#models/fact_game'
import { randomIntFromInterval } from '../../app/utils.js'
import { TeamFactory } from './team_factory.js'
import Team from '#models/team'

export const FactGameFactory = factory
  .define(FactGame, async () => {
    const teams = await Team.all()
    return {
      homeTeamId: randomIntFromInterval(1, teams.length),
      awayTeamId: randomIntFromInterval(1, teams.length),
      homeScore: randomIntFromInterval(1, 5),
      awayScore: randomIntFromInterval(1, 5),
    }
  })
  .relation('firstTeamId', () => TeamFactory)
  .relation('secondTeamId', () => TeamFactory)
  .build()
