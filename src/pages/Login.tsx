import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.13), #000000), url("./assets/mule.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: white;
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
  return (
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
  )
}

export default Login