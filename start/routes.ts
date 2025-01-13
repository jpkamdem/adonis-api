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
  })
  .prefix('/api')
