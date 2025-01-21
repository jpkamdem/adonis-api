import type { HttpContext } from '@adonisjs/core/http'
import { extractErrorMessage } from '../utils.js'
import User from '#models/user'
import { emailRegex } from '../enums.js'
import { loginUserValidation, registerUserValidation } from '#validators/auth'

export default class SessionController {
  async store({ request }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginUserValidation)
      if (!emailRegex.test(email)) {
        return { message: 'Votre email est invalide' }
      }

      const user = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(user)

      return { message: 'Connecté', token: token }
    } catch (error: unknown) {
      console.log(error)
      return { message: extractErrorMessage(error) }
    }
  }

  async handleRegister({ request }: HttpContext) {
    try {
      const { email, username, password } = await request.validateUsing(registerUserValidation)

      const user = new User()
      user.email = email
      user.username = username
      user.password = password
      await user.save()
      return { message: 'Utilisateur créé' }
    } catch (error: unknown) {
      console.log(error)
      return { message: extractErrorMessage(error) }
    }
  }
}
