type singleProduct = {
  quantity?: number
  _id: string
  title: string
  description: string
  img: string
  categories: string[]
  size: string[]
  color: string[]
  price: number
  inStock: boolean
  createdAt: number
  updatedAt: number
}

export type { singleProduct }
