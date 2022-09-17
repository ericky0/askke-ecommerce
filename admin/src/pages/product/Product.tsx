import { Publish } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import { productData } from '../../dummyData'
import { RootState } from '../../redux/store'
import { ProductType } from '../../types/Product'
import './product.scss'

const Product = () => {
  const location = useLocation()
  const productId = location.pathname.split('/')[2]

  const product: ProductType = useSelector((state: RootState) => {
    return state.product.products.find(product => product._id === productId)
  })!
  return (
    <div className="productPage">
      <div className="titleContainer">
        <h1>Product</h1>
        <Link to="/newProduct">
          <button>Create</button>
        </Link>
      </div>

      <div className="top">
        <div className="topLeft">
          <Chart
            data={productData}
            dataKey="Sales"
            title="Sales Perfomance"
            grid
          />
        </div>
        <div className="topRight">
          <div className="topInfo">
            <img
              src={product.img}
              alt=""
            />
            <span>{product.title}</span>
          </div>
          <div className="bottomInfo">
            <div className="infoItem">
              <span className="key">id:</span>
              <span className="value">{product._id}</span>
            </div>
            <div className="infoItem">
              <span className="key">sales:</span>
              <span className="value">5123</span>
            </div>
            <div className="infoItem">
              <span className="key">in stock:</span>
              <span className="value">{product.inStock.toString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <form>
          <div className="left">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} />
            <label>Product Description</label>
            <input type="text" placeholder={product.description} />
            <label>Price</label>
            <input type="text" placeholder={product.price.toString()} />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="right">
            <div className="upload">
              <label htmlFor="file"><img src={product.img} alt="" /><Publish className='publish' /></label>
              <input type="file" id="file" style={{ display: 'none' }} />
            </div>
          </div>
        </form>
        <div className="buttonWrapper">
          <button>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Product
