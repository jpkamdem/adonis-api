import type { HttpContext } from '@adonisjs/core/http'
import { extractErrorMessage } from '../utils.js'
import User from '#models/user'
import { emailRegex } from '../enums.js'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async store({ request }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      if (!emailRegex.test(email)) {
        return { message: 'Votre email est invalide' }
      }

      const user = await User.findByOrFail('email', email)
      if (!user) {
        return { message: 'Utilisateur introuvable' }
      }

      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        return { message: 'Mot de passe invalide' }
      }

      return { message: 'Connecté' }
    } catch (error: unknown) {
      return { message: extractErrorMessage(error) }
    }
  }
}
