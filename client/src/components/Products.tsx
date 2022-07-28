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

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`

type ProductsType = {
  category?: string | null,
  filters?: Object,
  sort?: string,
  productsPage?: boolean
}

const Products = ({category, filters, sort, productsPage}: ProductsType) => {
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
          setProducts(res.data)

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
    console.log(sort)
  }, [sort])

  return (
    <Container> 
      {filteredProducts.length === 0 && productsPage &&(
        <Title>Nenhum produto encontrado</Title>
      )}
      {category 
        ? filteredProducts.map((item) => ( <Product item={item} key={item.id}/> )) 
        : products
        .slice(0,7)
        .map((item) => ( <Product item={item} key={item.id}/> )) 
      } 
    </Container>
  )
}

export default Products