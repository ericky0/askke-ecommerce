import { useEffect, useMemo, useState } from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import { userData } from '../../dummyData'
import { userRequest } from '../../services/api'
import './home.scss'

interface monthlyRes {
  _id: number,
  total: number
}

interface IUserStats {
  name: string
  'Active User': number
}

const Home = () => {
  const [userStats, setUserStats] = useState<IUserStats[]>([])
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  )

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('user/status')
        res.data.map((item: monthlyRes) => {
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total }
          ])
        })
      } catch (err) {
        console.log(err)
      }
    }
    getStats()
  }, [MONTHS])

  return (
    <div className='homePage'>
      <FeaturedInfo />
      <Chart
        data={userStats}
        dataKey={'Active User'}
        grid={true}
        title={'User Analytics'}
      />
      <div className="widgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home