import { css } from 'styled-components'

export const mobile = (props: any) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    }
  `
}

export const smallTablet = (props: any) => {
  return css`
    @media only screen and (max-width: 640px) {
      ${props}
    }
  `
}

export const tablet = (props: any) => {
  return css`
    @media only screen and (max-width: 840px) {
      ${props}
    }
  `
}

export const cart = (props: any) => {
  return css`
    @media only screen and (max-width: 860px) {
      ${props}
    }
  `
}

export const smallScreen = (props: any) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `
}

export const normalScreen = (props: any) => {
  return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `
}
