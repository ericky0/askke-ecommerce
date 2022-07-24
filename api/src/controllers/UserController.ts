import { Request, Response } from 'express'
import { User } from '../models/User'

class UserController {
  // UPDATE
  async updateUser(req: Request, res: Response) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY!
      ).toString()
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export { UserController }
