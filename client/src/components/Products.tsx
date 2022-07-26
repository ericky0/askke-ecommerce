import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import api from "../services/api"

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

type ProductsType = {
  category?: string | null,
  filters?: any,
  sort?: string
}

const Products = ({category, filters, sort}: ProductsType) => {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get(
          category 
          ? `/product/find?category=${category}`
          : '/product/find'
          )
          
          let teste: any[] = []
          res.data.forEach((item: any) => {
            teste.push(item.categories.includes(category))
          })
          
        if(teste.length > 0){
          setProducts(res.data)
        } else {
          const secondRes = await api.get('/product/find')
          setProducts(secondRes.data)
        }
        

      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [category])
    
  useEffect(() => {
    category && 
      setFilteredProducts(
      products.filter((item) => 
        Object.entries(filters).every(([key, value]) => 
          item[key].includes(value)
        )
      )
    )
  }, [products, category, filters])

  return (
    <Container> 
      {filteredProducts.length === 0 && (
        products.map((item) => (
          <Product item={item} key={item.id}/>
        ))
      )}
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id}/>
      ))}
    </Container>
  )
}

export default Products