import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { extractErrorMessage } from '../utils.js'
import { emailRegex } from '../enums.js'
import db from '@adonisjs/lucid/services/db'
import { userUpdateValidator } from '#validators/user'

export default class UsersController {
  async getAllUsers({ response }: HttpContext) {
    try {
      const users = await User.all()
      if (!users) {
        return response
          .status(404)
          .json({ message: 'Erreur lors de la récupération des utilisateurs' })
      }

      return response.status(200).json(users)
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }

  async getUserById({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return response.status(404).json({ message: 'Utilisateur introuvable' })
      }

      return user
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getUserPosts({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return response.status(404).json({ message: 'Utilisateur introuvable' })
      }

      const userWithPosts = db
        .query()
        .from('users')
        .join('posts', 'users.id', '=', 'posts.user_id')
        .select(
          'users.id as user_id',
          'users.username',
          'users.email',
          'users.role',
          'users.created_at as users_created_at',
          'users.updated_at as users_updated_at',
          'posts.id as post_id',
          'posts.title',
          'posts.content',
          'posts.created_at as posts_created_at',
          'posts.updated_at as posts_updated_at'
        )
        .where('users.id', id)
      return response.status(200).json(userWithPosts)
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }

  async updateUser({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return response.status(404).json({ message: 'Utilisateur introuvable' })
      }

      const { email, username, password } = await request.validateUsing(userUpdateValidator)

      if (email) {
        user.email = email
      }

      if (username) {
        user.username = username
      }

      if (password) {
        user.password = password
      }

      await user.save()
      return response
        .status(201)
        .json({ message: `Modification(s) de l'utilisateur effectuée(s) avec succès` })
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }

  async deleteUser({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.status(404).json({ message: 'ID manquant' })
      }

      const user = await User.findOrFail(id)
      if (!user) {
        return response.status(404).json({ message: 'Utilisateur introuvable' })
      }

      await user.delete()
      return response.status(204).json({ message: `Utilisateur supprimé avec succès` })
    } catch (error: unknown) {
      return response.status(404).json({ message: extractErrorMessage(error) })
    }
  }
}
