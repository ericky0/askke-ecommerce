import { Visibility } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { userRequest } from '../../services/api'
import { UserType } from '../../types/User'
import './widgetSm.scss'

const WidgetSm = () => {
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('user/findall?new=true')
        setUsers(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [])
  return (
    <div className='widgetSmComponent'>
      <span className='title'>New Join Members</span>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.img || 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'} alt="" />
            <div>
              <span className='username'>{user.username}</span>
              <span className='userTitle'>Developer</span>
            </div>
            <button>
              <Visibility className='icon' />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetSm