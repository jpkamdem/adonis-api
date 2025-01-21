import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { extractErrorMessage } from '../utils.js'
import { createPostValidator } from '#validators/post'

export default class PostsController {
  async getAllPosts({ response }: HttpContext) {
    try {
      const posts = await Post.all()
      if (!posts) {
        return response.abort({ message: 'Erreur lors de la récupération des posts' })
      }

      return response.status(200).json(posts)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async getPostById({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const post = await Post.findOrFail(id)
      if (!post) {
        return response.abort({ message: 'Post introuvable' })
      }

      return response.status(200).json(post)
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async createPost({ request, response }: HttpContext) {
    try {
      const { title, content } = await request.validateUsing(createPostValidator)

      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const post = new Post()
      post.userId = id
      post.title = title
      post.content = content

      await post.save()
      return response.status(201).json({ message: 'Post créé avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async updatePost({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const post = await Post.findOrFail(id)
      if (!post) {
        return response.abort({ message: 'Post introuvable' })
      }

      const { title, content } = await request.validateUsing(createPostValidator)

      if (title) {
        post.title = title
      }

      if (content) {
        post.content = content
      }

      await post.save()
      return response
        .status(201)
        .json({ message: 'Modification(s) du post effectuée(s) avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async deletePost({ request, response }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return response.abort({ message: 'ID manquant' })
      }

      const post = await Post.findOrFail(id)
      if (!post) {
        return response.abort({ message: 'Post introuvable' })
      }

      await post.delete()
      return response.status(204).json({ message: 'Post supprimé avec succès' })
    } catch (error: unknown) {
      return response.abort({ message: extractErrorMessage(error) })
    }
  }
}
