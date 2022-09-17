import { format } from 'timeago.js'
import { useEffect, useState } from 'react'
import { userRequest } from '../../services/api'
import { Order } from '../../types/Order'
import Button from './button/Button'
import './widgetLg.scss'

const WidgetLg = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('order/findall')
        setOrders(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [])
  return (
    <div className='widgetLgComponent'>
      <h3 className="title">Latest Transactions</h3>
      <table>
        <tr className='firstTr'>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {orders.map(order => (
          <tr className='secondTr' key={order._id}>
            <td className='user'>
              <img src="https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg" alt="" />
              <span>{order.userId}</span>
            </td>
            <td className='date'>{format(order.createdAt)}</td>
            <td className='amount'>${order.amount}</td>
            <td className='status'><Button type={order.status} /></td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default WidgetLg