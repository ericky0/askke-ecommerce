import './featuredInfo.scss'

import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { userRequest } from '../../services/api'

interface IIncome {
  _id: number
  total: number
}

const FeaturedInfo = () => {
  const [income, setIncome] = useState<IIncome[]>([])
  const [perc, setPerc] = useState(0)
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get('order/monthly')
        let newRes: IIncome[] = res.data.sort((x: IIncome, y: IIncome) => x._id - y._id)
        setIncome(res.data)
        setPerc((newRes[1]?.total - newRes[0]?.total) / (newRes[0]?.total) * 100)
      } catch (error) {
        console.log(error)
      }
    }
    getIncome()
  }, [])
  console.log(perc)

  return (
    <div className='featuredInfoComponent'>
      <div className='item'>
        <span className='title'>Revanue</span>
        <div>
          <span className='money'>${income[1]?.total}</span>
          <span className='moneyRate'>
            %{Math.floor(perc)}
            {
              perc < 0 ? (
                <ArrowDownward className='icon negative' />
              ) : (
                <ArrowUpward className='icon' />
              )
            }
          </span>
        </div>
        <span className='sub'>Compared to last month</span>
      </div>

      <div className='item'>
        <span className='title'>Sales</span>
        <div>
          <span className='money'>$5,315</span>
          <span className='moneyRate'>
            -1,4 <ArrowDownward className='icon negative' />
          </span>
        </div>
        <span className='sub'>Compared to last month</span>
      </div>

      <div className='item'>
        <span className='title'>Cost</span>
        <div>
          <span className='money'>$2,215</span>
          <span className='moneyRate'>
            +12,4 <ArrowUpward className='icon' />
          </span>
        </div>
        <span className='sub'>Compared to last month</span>
      </div>
    </div>
  )
}

export default FeaturedInfo