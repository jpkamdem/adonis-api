/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const PostsController = () => import('#controllers/posts_controller')
const TeamsController = () => import('#controllers/teams_controller')
const PlayersController = () => import('#controllers/players_controller')
const IncidentsController = () => import('#controllers/incidents_controller')
const FactGamesController = () => import('#controllers/fact_games_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [UsersController, 'getAllUsers'])
        router.get('/:id', [UsersController, 'getUserById'])
        router.get('/posts/:id', [UsersController, 'getUserPosts'])
        router.get('/posts/get/all', [UsersController, 'getAllUsersPosts'])
        router.patch('/:id', [UsersController, 'updateUser'])
        router.delete('/:id', [UsersController, 'deleteUser'])
      })
      .prefix('/users')
    router
      .group(() => {
        router.get('/', [PostsController, 'getAllPosts'])
        router.get('/:id', [PostsController, 'getPostById'])
        router.post('/:id', [PostsController, 'createPost'])
        router.patch('/:id', [PostsController, 'updatePost'])
        router.delete('/:id', [PostsController, 'deletePost'])
      })
      .prefix('/posts')
    router
      .group(() => {
        router.get('/', [TeamsController, 'getAllTeams'])
        router.get('/:id', [TeamsController, 'getTeamById'])
        router.get('/players/:id', [TeamsController, 'getTeamPlayers'])
        router.get('/players/get/all', [TeamsController, 'getAllTeamsWithPlayers'])
        router.post('/', [TeamsController, 'createTeam'])
        router.patch('/:id', [TeamsController, 'updateTeam'])
        router.delete('/:id', [TeamsController, 'deleteTeam'])
      })
      .prefix('/teams')
    router
      .group(() => {
        router.get('/', [PlayersController, 'getAllPlayers'])
        router.get('/:id', [PlayersController, 'getPlayerById'])
        router.post('/', [PlayersController, 'createPlayer'])
        router.patch('/:id', [PlayersController, 'updatePlayer'])
        router.delete('/:id', [PlayersController, 'deletePlayer'])
      })
      .prefix('/players')
    router
      .group(() => {
        router.get('/', [IncidentsController, 'getAllIncidents'])
        router.get('/:id', [IncidentsController, 'getIncidentById'])
        router.post('/', [IncidentsController, 'createIncident'])
        router.patch('/:id', [IncidentsController, 'updateIncident'])
        router.delete('/:id', [IncidentsController, 'deleteIncident'])
      })
      .prefix('/incidents')
    router
      .group(() => {
        router.get('/', [FactGamesController, 'getAllGames'])
        router.get('/:id', [FactGamesController, 'getGameById'])
        router.post('/', [FactGamesController, 'createGame'])
      })
      .prefix('/games')
    router
      .group(() => {
        router.post('/login', [SessionController, 'store'])
        router.post('/register', [SessionController, 'handleRegister'])
      })
      .prefix('/auth')
  })
  .prefix('/api')
