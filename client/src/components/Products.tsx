import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"
import { singleProduct } from "../types/Product"
import { publicRequest } from "../services/api"

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`

type ProductsComponentType = {
  category?: string | null,
  filters?: Object,
  sort?: string,
  productsPage?: boolean
}


const Products = ({category, filters, sort, productsPage}: ProductsComponentType) => {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<singleProduct[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category 
          ? `/product/find?category=${category}`
          : '/product/find'
          )
          setProducts(res.data)

      } catch (error: any) {
          console.log(error.response)
      }
    }
    getProducts()
  }, [category])

  useEffect(() => {
    console.log('produtos' + products)
    console.log('produtos filtrados' + filteredProducts)
  }, [filteredProducts, products])
    
  useEffect(() => {
    category && 
      setFilteredProducts(
      products.filter((item) => 
        Object.entries(filters!).every(([key, value]) => 
          item[key].includes(value)
        )
      )
    )
  }, [products, category, filters])

  useEffect(() => {
    if((sort === 'newest')) {
      setFilteredProducts(prev => 
        [...prev].sort((a, b) => a.createdAt - b.createdAt) 
      )
    } else if ((sort === 'asc')) {
    setFilteredProducts(prev => 
        [...prev].sort((a, b) => a.price - b.price) 
      )
    } else if ((sort === 'desc')){
      setFilteredProducts(prev => 
        [...prev].sort((a, b) => b.price - a.price) 
      )
    }
  }, [sort])

  return (
    <Container> 
      {filteredProducts.length === 0 && productsPage &&(
        <Title>Nenhum produto encontrado</Title>
      )}
      {category 
        ? filteredProducts.map((item) => ( <Product item={item} key={item._id}/> )) 
        : products
        .slice(0,7)
        .map((item) => ( <Product item={item} key={item._id}/> )) 
      } 
    </Container>
  )
}

export default Products