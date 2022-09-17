interface Order {
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
  _id: string
}

export type { Order }
