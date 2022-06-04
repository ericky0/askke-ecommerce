import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { mobile, smallScreen, smallTablet } from '../responsive';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  ${mobile({ flexDirection: 'column' })}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Logo = styled.h1`
  ${mobile({ textAlign: 'center' })}

`
const Desc = styled.p`
  margin: 20px 0px;
`
const SocialContainer = styled.div`
  display: flex;
`
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props: {color: string}) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${smallScreen({ display: 'none' })}

`

const Title = styled.h3 `
  margin-bottom: 30px;
`

const List = styled.ul `
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li `
  width: 50%;
  margin-bottom: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
  ${smallTablet({ backgroundColor: '#fafafa'})}
  
`

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  ${mobile({ justifyContent: 'space-between;', padding: '0px 10px' })}
  
  gap: 10px;
`

const Payment = styled.img`
  width: 50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>ASKe.</Logo>
        <Desc>Vivemos tempos sem precedentes, quando velhas convicções são tão frágeis quanto uma folha de papel.</Desc>
        <SocialContainer>
           <SocialIcon color="#3B5599">
            <FacebookIcon />
           </SocialIcon>
           <SocialIcon color="#E4405F">
            <InstagramIcon />
           </SocialIcon>
           <SocialIcon color="#55ACEE">
            <TwitterIcon />
           </SocialIcon>
           <SocialIcon color="#E60023">
            <PinterestIcon />
           </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Links úteis</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Carrinho</ListItem>
          <ListItem>Moda Masculina</ListItem>
          <ListItem>Moda Feminina</ListItem>
          <ListItem>Acessórios</ListItem>
          <ListItem>Minha Conta</ListItem>
          <ListItem>Acompanhamento de pedidos</ListItem>
          <ListItem>Lista de desejos</ListItem>
          <ListItem>Termos</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contato</Title>
        <ContactItem>
          <LocationOnIcon />
          Fortaleza, Rua Raimundo Alexandre 403
        </ContactItem>
        <ContactItem>
          <PhoneIcon/>
          +55 (85) 98931-5013
        </ContactItem>
        <ContactItem>
          <EmailOutlinedIcon />
          contact@aske.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer