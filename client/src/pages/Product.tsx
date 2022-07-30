import { Add, Remove } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { tablet } from '../responsive'
import { publicRequest } from '../services/api'
import { singleProduct } from '../types/Product'

const Container = styled.div`
  
`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${tablet({padding: "10px", flexDirection: 'column'})}
`
const ImgContainer = styled.div`
  flex: 1;
`
const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${tablet({height: "50vh", objectFit: 'contain'})}
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${tablet({padding: '0px 20px'})}
`
const Title = styled.h1`
  font-weight: 200;
`
const Desc = styled.p`
  margin: 20px 0px;
`
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const FilterContainer = styled.div`
  margin: 30px 0px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  ${tablet({width: "100%"})}
`
const Filter = styled.div`
  display: flex;
  align-items: center;
`
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props: {color: string}) => props.color === 'white' ? '#d8d8d8' : props.color};
  margin: 0px 5px;
  cursor: pointer;

`

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({width: "100%"})}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease;
  &:hover {
    background-color: #f8f4f4;
  }
`

const Product = () => {

  const location = useLocation()
  const productId = location.pathname.split('/')[2]

  const [product, setProduct] = useState<singleProduct>()
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/product/find/${productId}`)
        setProduct(res.data)
      } catch (error: any) {
        console.error(error.response.data)
      }
    }
    getProduct()
  }, [productId])

  const handleQuantity = (type: string) => {
    if(type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product?.img} alt="cloath" />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>{product?.description}</Desc>
          <Price>R$ {product?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color.map(c => (
                <FilterColor color={c} key={c}/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                {product?.size.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove style={{ cursor: 'pointer' }} onClick={() => handleQuantity('dec')}/>
              <Amount>{quantity}</Amount>
              <Add style={{ cursor: 'pointer' }}  onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product