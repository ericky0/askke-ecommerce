import { useState } from 'react'
import styled from 'styled-components'
import { mobile, smallTablet, tablet } from '../responsive'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/mule2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: -0px;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.13), #000000);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: #ffffff;
  @media only screen and (max-width: 902px) {
      width: 45%;
    }
    ${tablet({ width: '50%' })}
    ${smallTablet({ width: '75%' })}
    ${mobile({ width: '95%' })}
`
const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 18px;
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`

const Button = styled.button`
  width: 45%;
  border: none;
  padding: 15px 20px;
  background-color: ${(props: {inverse: boolean}) => props.inverse ? "black" : "teal" };
  color: white;
  cursor: pointer;
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [username, setUsername] = useState('')
  return (
    <Background>
    <Container>
      <Wrapper>
        <Title>FAZER LOG-IN</Title>
        <Form>
          <Input placeholder="usuário" type="text" />
          <Input placeholder="senha" type="password" />
          <ButtonsContainer>
            <Button>ENTRAR</Button>
            <Button inverse={true}>CRIAR CONTA</Button>
          </ButtonsContainer>
          <Link>NÃO LEMBRO MINHA SENHA</Link>
        </Form>
      </Wrapper>
    </Container>
    </Background>
  )
}

export default Login