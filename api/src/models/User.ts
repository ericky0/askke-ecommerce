import { model, Schema, Model, Document } from 'mongoose'

interface IUser extends Document {
  _id: Schema.Types.ObjectId
  username: string
  email: string
  password: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
  img: string
  _doc?: any
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean,
      default: false
    },
    img: { type: String }
  },
  { timestamps: true }
)

export const User: Model<IUser> = model('User', UserSchema)
