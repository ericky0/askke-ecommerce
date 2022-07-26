import { Link } from "react-router-dom"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: '25vh' })}

`
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  color: white;
  text-shadow: 1px 0px 1px #181818, 0px 1px 1px #181818, 2px 1px 1px #181818, 1px 2px 1px #181818, 3px 2px 1px #181818, 2px 3px 1px #181818, 4px 3px 1px #181818;
  text-align: center;
  margin-bottom: 20px;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`

type CategoryItemProps = {
  item: {id: number, img: string, title: string, category: string}
}

const CategoryItem = ({item}: CategoryItemProps) => {
  return (
    <Container>
      <Link to={`/products/${item.category}`}>
        <Image src={item.img}/>
        <Info>
          <Title>{item.title}</Title>
          <Button>COMPRE AGORA</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem