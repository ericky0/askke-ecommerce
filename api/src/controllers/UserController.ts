import { Request, Response } from 'express'
import { User } from '../models/User'
import CryptoJS from 'crypto-js'

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

  //DELETE

  async deleteUser(req: Request, res: Response) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('user has been deleted successfully')
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET USER

  async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id)
      const { password, ...others } = user._doc
      res.status(200).json({ ...others })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET ALL USERS

  async getAllUsers(req: Request, res: Response) {
    const query = req.query.new
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET USER STATS

  async getUserStats(req: Request, res: Response) {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' }
          }
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 }
          }
        }
      ])
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export { UserController }
