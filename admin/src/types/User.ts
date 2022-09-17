type UserType = {
  _id: string
  username: string
  email: string
  password: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
  img?: string
}

export type { UserType }
