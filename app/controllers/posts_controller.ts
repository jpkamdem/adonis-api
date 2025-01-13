import type { HttpContext } from '@adonisjs/core/http'

import Post from '#models/post'
import { extractErrorMessage } from '../utils.js'

export default class PostsController {
  async getAllPosts() {
    try {
      const posts = await Post.all()
      if (!posts) {
        return { message: 'Erreur lors de la récupération des posts' }
      }

      return posts
    } catch (error) {
      return { message: extractErrorMessage(error) }
    }
  }

  async getPostById({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const post = Post.findOrFail(id)
      if (!post) {
        return { message: 'Post introuvable' }
      }

      return post
    } catch (error) {
      return { message: extractErrorMessage(error) }
    }
  }

  async createPost({ request }: HttpContext) {
    try {
      const { userId, title, content } = request.body()
      if (!userId || !title || !content) {
        return { message: 'Veuillez remplir tous les champs.' }
      }

      if (typeof title !== 'string' || typeof content !== 'string') {
        return { message: 'Veuillez entrer une chaine de caractère' }
      }

      const post = new Post()
      post.userId = userId
      post.title = title
      post.content = content

      await post.save()
      return { message: 'Post créé avec succès' }
    } catch (error) {
      return { message: extractErrorMessage(error) }
    }
  }

  async updatePost({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const post = await Post.findOrFail(id)
      if (!post) {
        return { message: 'Post introuvable' }
      }

      if ('title' in request.body()) {
        const { title } = request.body()

        post.title = title
      }
      if ('content' in request.body()) {
        const { content } = request.body()

        post.content = content
      }

      await post.save()
      return { message: 'Modification(s) du post effectuée(s) avec succès' }
    } catch (error) {
      return { message: extractErrorMessage(error) }
    }
  }
  async deletePost({ request }: HttpContext) {
    try {
      const id = request.params().id
      if (!id) {
        return { message: 'ID manquant' }
      }

      const post = await Post.findOrFail(id)
      if (!post) {
        return { message: 'Post introuvable' }
      }

      await post.delete()
      return { message: 'Post supprimé avec succès' }
    } catch (error) {
      return { message: extractErrorMessage(error) }
    }
  }
}
