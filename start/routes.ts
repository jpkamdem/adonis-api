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
        router.post('/', [UsersController, 'createUser'])
        router.patch('/:id', [UsersController, 'updateUser'])
        router.delete('/:id', [UsersController, 'deleteUser'])
      })
      .prefix('/users')
    router
      .group(() => {
        router.get('/', [PostsController, 'getAllPosts'])
        router.get('/:id', [PostsController, 'getPostById'])
        router.post('/', [PostsController, 'createPost'])
        router.patch('/:id', [PostsController, 'updatePost'])
        router.delete('/:id', [PostsController, 'deletePost'])
      })
      .prefix('/posts')
    router
      .group(() => {
        router.get('/', [TeamsController, 'getAllTeams'])
        router.get('/:id', [TeamsController, 'getTeamById'])
        router.get('/players/:id', [TeamsController, 'getTeamPlayers'])
        router.post('/', [TeamsController, 'createTeam'])
        router.patch('/:id', [TeamsController, 'updateTeam'])
        router.delete('/:id', [TeamsController, 'deleteTeam'])
      })
      .prefix('/teams')
  })
  .prefix('/api')
