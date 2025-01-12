import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { extractErrorMessage } from '../utils.js'
import { emailRegex } from '../enums.js'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async getAllUsers() {
    try {
      const users = await User.all()
      if (!users) {
        return { message: 'Erreur lors de la récupération des utilisateurs' }
      }

      return users
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getUserById({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return { message: 'Utilisateur introuvable' }
      }

      return user
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getUserPosts({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return { message: 'Utilisateur introuvable' }
      }

      // const userWithPosts = await db.rawQuery(
      //   `SELECT
      //       users.id,
      //       users.email,
      //       users.role,
      //       users.created_at AS users_created_at,
      //       users.updated_at AS users_updated_at,
      //       posts.title,
      //       posts.content,
      //       posts.created_at AS posts_created_at,
      //       posts.updated_at AS posts_updated_at
      //       FROM users
      //       JOIN posts
      //       ON users.id = posts.user_id
      //       WHERE users.id = ${id};`
      // )

      const userWithPosts = db
        .query()
        .from('users')
        .join('posts', 'users.id', '=', 'posts.user_id')
        .select(
          'users.id as userId',
          'users.username',
          'users.email',
          'users.role',
          'users.created_at as userCreatedAt',
          'users.updated_at as usersUpdatedAt',
          'posts.id as postId',
          'posts.title',
          'posts.content',
          'posts.created_at as postsCreatedAt',
          'posts.updated_at as postsUpdatedAt'
        )
        .where('users.id', id)
      return userWithPosts
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async createUser({ request }: HttpContext) {
    try {
      const { email, username, password } = request.body()
      if (!email || !username || !password) {
        return { message: 'Veuillez remplir tous les champs.' }
      }

      if (!emailRegex.test(email)) {
        return { message: 'Votre email est invalide' }
      }

      const typeCheck = typeof username === 'string' && typeof password === 'string'
      if (!typeCheck) {
        return { message: 'Veuillez entrer une chaine de caractère' }
      }

      const user = new User()
      user.username = username
      user.email = email
      user.password = password

      await user.save()
      return { message: `Utilisateur ${username} créé avec succès` }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async updateUser({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return { message: 'Utilisateur introuvable' }
      }

      if ('email' in request.body()) {
        const { email } = request.body()
        if (!emailRegex.test(email)) {
          return { message: 'Votre email est invalide' }
        }

        user.email = email
      }

      if ('username' in request.body()) {
        const { username } = request.body()
        if (typeof username !== 'string') {
          return { message: 'Veuillez entrer une chaine de caractère' }
        }

        user.username = username
      }

      if ('password' in request.body()) {
        const { password } = request.body()
        if (typeof password !== 'string') {
          return { message: 'Veuillez entrer une chaine de caractère' }
        }

        user.password = password
      }

      await user.save()
      return { message: `Modification(s) de l'utilisateur effectuée(s) avec succès` }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async deleteUser({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return { message: 'Utilisateur introuvable' }
      }

      await user.delete()
      return { message: `Utilisateur supprimé avec succès` }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
