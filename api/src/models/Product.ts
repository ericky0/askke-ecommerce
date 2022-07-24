import { model, Schema, Model, Document } from 'mongoose'

interface IProduct extends Document {
  title: string
  description: string
  img: string
  categories: string[]
  size: string
  color: string
  price: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    img: {
      type: String,
      required: true
    },

    categories: {
      type: Array
    },

    size: {
      type: String
    },

    color: {
      type: String
    },

    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

export const Product: Model<IProduct> = model('Product', ProductSchema)
