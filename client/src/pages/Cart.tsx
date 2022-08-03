import { Add, Remove } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { RootState } from '../redux/store'
import { cart } from '../responsive'
import StripeCheckout, { Token } from 'react-stripe-checkout'
import { useEffect, useState } from 'react'
import { userRequest } from '../services/api'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  
`

const Wrapper = styled.div`
  padding: 20px;
  ${cart({padding: "10px"})}
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props: {type: string}) => props.type === 'filled' && 'none'};
  background-color: ${(props: {type: string}) => props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props: {type: string}) => props.type === 'filled' && 'white'};
`

const TopTexts = styled.div`
    ${cart({display: 'none'})}
`

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${cart({flexDirection: 'column'})}
`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${cart({flexDirection: "column"})}
  margin-bottom: 30px;
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
  position: relative;
`

const Color = styled.div`
  position: absolute;
  top: 0;
  left: 35px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props: {color: string}) => props.color};
  border: 1px solid black;
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${cart({margin: "5px 15px"})}
`
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${cart({marginBottom: "20px"})}

`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 45vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props: {type: string}) => props.type === 'total' && 500};
  font-size: ${(props: {type: string}) => props.type === 'total' && '24px'};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span` `

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`


const Cart = () => {

  const KEY = process.env.REACT_APP_STRIPE!
  const cart = useSelector((state: RootState) => state.cart)
  const [stripeToken, setStripeToken] = useState<Token>()
  const navigate = useNavigate()

  const onToken = (token: Token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/stripe/payment', {
            tokenId: stripeToken?.id,
            amount: 500
        })
        navigate('/success', {state: { stripeData: res.data, cart: cart }})
      } catch (error) {
        console.log(error)
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken, cart, navigate])

  return (
    <Container> 
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>SEU CARRINHO</Title>
        <Top>
          <TopButton>CONTINUE COMPRANDO</TopButton>
          <TopTexts>
            <TopText>Bolsa de Compras({cart.quantity})</TopText>
            <TopText>Lista de Desejos (0)</TopText>
          </TopTexts>
          <TopButton type="filled">COMPRAR AGORA</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} alt="" />
                  <Details>
                    <ProductName><b>Produto:</b> {product.title}</ProductName>
                    <ProductId><b>ID:</b> {product._id} </ProductId>
                    <ProductColor> 
                      <b>Cor:</b> 
                      <Color color={product.color}/>
                    </ProductColor>
                    <ProductSize><b>Tamanho:</b> {product.size}</ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer> 
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>R$ {product.price * product.quantity!}</ProductPrice>
                </PriceDetail>
              </Product>
            ))
            }
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>RESUMO DO PEDIDO</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>R$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Envio Estimado</SummaryItemText>
              <SummaryItemPrice>R$ 15,40</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Desconto de Envio</SummaryItemText>
              <SummaryItemPrice> R$ -15,40</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>R$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='ASKe Shop'
              image='https://media-exp1.licdn.com/dms/image/C4E03AQGDXvj-okKVpA/profile-displayphoto-shrink_800_800/0/1654195318530?e=1665014400&v=beta&t=0H11KB7SV3HqUP6aC8IKWVEtYZUk9xKOqSts5ylx4XM'
              billingAddress
              shippingAddress
              description={`Your total is R$${cart.total}`}
              amount={500}
              token={onToken}
              stripeKey={KEY!}
            > 
              <Button>COMPRAR AGORA</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart