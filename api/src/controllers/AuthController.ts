import { Request, Response } from 'express'
import { User } from '../models/User'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

class AuthController {
  // REGISTER
  async createUser(req: Request, res: Response) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY!
      ).toString()
    })

    try {
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // LOGIN
  async login(req: Request, res: Response) {
    try {
      const user = await User.findOne({ username: req.body.username })
      !user && res.status(401).json('no user')
      const hashedPassword = CryptoJS.AES.decrypt(
        user!.password,
        process.env.SECRET_KEY!
      )

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

      if (OriginalPassword !== req.body.password) {
        return res.status(401).json('wrong credentials')
      }
      const accessToken = jwt.sign(
        {
          id: user?._id,
          isAdmin: user?.isAdmin
        },
        process.env.JWT_SEC!,
        { expiresIn: '3d' }
      )

      const { password, ...others } = user._doc

      return res.status(200).json({ ...others, accessToken })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export { AuthController }
