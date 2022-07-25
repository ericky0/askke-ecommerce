import { Request, Response } from 'express'
import { Product } from '../models/Product'

class ProductController {
  // NEW PRODUCT
  async newProduct(req: Request, res: Response) {
    const newProduct = new Product(req.body)
    try {
      const savedProduct = await newProduct.save()
      res.status(200).json(savedProduct)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // UPDATE PRODUCT

  async updateProduct(req: Request, res: Response) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
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

  // DELETE PRODUCT
  async deleteProduct(req: Request, res: Response) {
    try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json('product has been deleted successfully')
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET PRODUCT
  async getProduct(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // GET ALL PRODUCTS
  async getAllProducts(req: Request, res: Response) {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
      let products = []

      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(5)
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory]
          }
        })
      } else {
        products = await Product.find()
      }
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export { ProductController }
