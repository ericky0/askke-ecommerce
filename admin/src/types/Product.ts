interface ProductType {
  _id: string
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

export type { ProductType }
