import { model, Schema, Model, Document } from 'mongoose'

interface IOrder extends Document {
  userId: string
  products: [{ productId: string; quantity: number }]
  amount: number
  address: {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: any
  }
  status: string
  createdAt: string
  updatedAt: string
}

const OrderSchema: Schema = new Schema(
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
    ],

    amount: {
      type: Number,
      required: true
    },

    address: {
      type: Object,
      required: true
    },

    status: {
      type: String,
      default: 'pending'
    }
  },
  { timestamps: true }
)

export const Order: Model<IOrder> = model('Order', OrderSchema)
