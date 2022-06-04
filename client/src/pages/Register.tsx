import styled from 'styled-components'
import { mobile, smallTablet, tablet } from '../responsive'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.13), #000000), url("./assets/mule.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
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
  flex-wrap: wrap;
`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  font-size: 18px;
`

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0px;
`

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.button`
  width: 45%;
  border: none;
  padding: 15px 20px;
  background-color: ${(props: {inverse: boolean}) => props.inverse ? "black" : "teal" };
  color: white;
  cursor: pointer;
`

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CRIE UMA CONTA</Title>
        <Form>
          <Input placeholder="nome" type="text" />
          <Input placeholder="último nome" type="text" />
          <Input placeholder="email" type="email" />
          <Input placeholder="usuário" type="text" />
          <Input placeholder="senha" type="password" />
          <Input placeholder="confirmar senha" type="password" />
          <Agreement>
            Ao criar uma conta,
            autorizo o tratamento dos meus dados pessoais
            de acordo com a <b>POLÍTICA DE PRIVACIDADE</b>
          </Agreement>
          <ButtonsContainer>
            <Button>Criar</Button>
            <Button inverse={true}>Já tenho uma conta</Button>
          </ButtonsContainer>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register