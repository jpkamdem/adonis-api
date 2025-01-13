/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
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
        router.post('/', [UsersController, 'createUser'])
        router.patch('/:id', [UsersController, 'updateUser'])
        router.delete('/:id', [UsersController, 'deleteUser'])
      })
      .prefix('/users')
  })
  .prefix('/api')
