import { Request, Response } from 'express'
import { Order } from '../models/Order'

class OrderController {
  // NEW ORDER
  async newOrder(req: Request, res: Response) {
    const newOrder = new Order(req.body)
    try {
      const savedOrder = await newOrder.save()
      res.status(200).json(savedOrder)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // UPDATE PRODUCT

  async updateOrder(req: Request, res: Response) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        {
          new: true
        }
      )
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // DELETE ORDER
  async deleteOrder(req: Request, res: Response) {
    try {
      await Order.findByIdAndDelete(req.params.id)
      res.status(200).json('product has been deleted successfully')
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET USER ORDER
  async getOrder(req: Request, res: Response) {
    try {
      // req.params.id should be => USER ID /// not ORDER ID
      const order = await Order.find({ userId: req.params.id })
      res.status(200).json(order)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET MONTHLY INCOME
  async getMonthly(req: Request, res: Response) {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    )

    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount'
          }
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' }
          }
        }
      ])
      res.status(200).json(income)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET ALL ORDERS
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await Order.find()
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export { OrderController }
