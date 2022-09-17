import './button.scss'

interface ButtonType {
  type: string;
}

const Button = ({ type }: ButtonType) => {
  return (
    <button className={'buttonWidgetLg ' + type.toLowerCase()}>{type}</button>
  )
}

export default Button