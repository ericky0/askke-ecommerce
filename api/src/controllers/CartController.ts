import { Request, Response } from 'express'
import { Cart } from '../models/Cart'

class CartController {
  // NEW CART
  async newCart(req: Request, res: Response) {
    const newCart = new Cart(req.body)
    try {
      const savedCart = await newCart.save()
      res.status(200).json(savedCart)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // UPDATE PRODUCT

  async updateCart(req: Request, res: Response) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
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

  // DELETE CART
  async deleteCart(req: Request, res: Response) {
    try {
      await Cart.findByIdAndDelete(req.params.id)
      res.status(200).json('product has been deleted successfully')
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET USER CART
  async getCart(req: Request, res: Response) {
    try {
      // req.params.id should be => USER ID /// not CART ID
      const cart = await Cart.findOne({ userId: req.params.id })
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET ALL CARTS

  async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await Cart.find()
      res.status(200).json(carts)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export { CartController }
