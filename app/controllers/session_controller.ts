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

      return { message: 'Connecté' }
    } catch (error: unknown) {
      console.log(error)
      return { message: extractErrorMessage(error) }
    }
  }

  async register({ request }: HttpContext) {
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
