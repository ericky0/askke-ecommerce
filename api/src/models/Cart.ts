import { model, Schema, Model, Document } from 'mongoose'

interface ICart extends Document {
  userId: string
  products: [{ productId: string; quantity: number }]
}

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        productId: {
          type: String
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
)

export const Cart: Model<ICart> = model('Cart', CartSchema)
