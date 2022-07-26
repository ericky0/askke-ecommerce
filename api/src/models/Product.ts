import { model, Schema, Model, Document } from 'mongoose'

interface IProduct extends Document {
  title: string
  description: string
  img: string
  categories: string[]
  size: string[]
  color: string[]
  price: number
  createdAt: Date
  updatedAt: Date
  scale?: number
  inStock: boolean
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
      type: Array
    },

    color: {
      type: Array
    },

    price: {
      type: Number,
      required: true
    },

    scale: {
      type: Number,
      required: false
    },

    inStock: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export const Product: Model<IProduct> = model('Product', ProductSchema)
