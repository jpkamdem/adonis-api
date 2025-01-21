import type { HttpContext } from '@adonisjs/core/http'
import { extractErrorMessage } from '../utils.js'
import User from '#models/user'
import { loginUserValidation, registerUserValidation } from '#validators/auth'

export default class SessionController {
  async store({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginUserValidation)

      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      return response
        .cookie('token', token, { maxAge: '15m', secure: true, sameSite: 'lax' })
        .cookie('user', user)
        .status(201)
        .json({ message: 'Connecté' })
    } catch (error: unknown) {
      console.log(error)
      return response.abort({ message: extractErrorMessage(error) })
    }
  }

  async handleRegister({ request, response }: HttpContext) {
    try {
      const { email, username, password } = await request.validateUsing(registerUserValidation)

      const user = new User()
      user.email = email
      user.username = username
      user.password = password
      await user.save()
      return response.status(201).json({ message: 'Utilisateur créé' })
    } catch (error: unknown) {
      console.log(error)
      return response.abort({ message: extractErrorMessage(error) })
    }
  }
}
