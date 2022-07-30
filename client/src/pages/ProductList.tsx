import { ChangeEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { mobile } from '../responsive'

const Container = styled.div`
  
`
const Title = styled.h1`
  margin: 20px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({width: "0px 20px", display: 'flex', flexDirection: 'column'})}
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin: "10px 0px"})}
`

const Option = styled.option`
  
`

const ProductList = () => {
  const location = useLocation()
  const category = location.pathname.split('/')[2]
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState('newest')

  const handleFilters = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFilters({
      ...filters,
      [e.target.name]: value
    })
  }

  return (
    <Container> 
      <Announcement />
      <Navbar />
      <Title>
        {category.toUpperCase()[0] + category.substring(1).toLowerCase()}
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrar Produtos: </FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>
              Cor
            </Option>
            <Option value='white'>branco</Option>
            <Option value='black'>preto</Option>
            <Option value='red'>vermelho</Option>
            <Option value='blue'>azul</Option>
            <Option value='yellow'>amarelo</Option>
            <Option value='green'>verde</Option>
            <Option value='orange'>laranja</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>
              Tamanho
            </Option>
            <Option>P</Option>
            <Option>M</Option>
            <Option>G</Option>
            <Option>GG</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sortear Produtos: </FilterText>
          <Select onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}>
            <Option value="newest"> Mais Recentes </Option>
            <Option value="asc">Preço (crescente)</Option>
            <Option value="desc">Preço (decrescente)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} productsPage={true}/>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList