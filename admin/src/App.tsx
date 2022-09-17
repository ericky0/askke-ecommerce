import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NewProduct from './pages/newProduct/NewProduct';
import NewUser from './pages/newUser/NewUser';
import Product from './pages/product/Product';
import ProductList from './pages/productList/ProductList';
import User from './pages/user/User';
import UserList from './pages/userList/UserList';
import './styles/app.scss'

function Layout() {
  return (
    <>
      <Topbar />
      <div className="containerApp">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

function App() {
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user).currentUser
  const isAdmin = () => {
    if (
      JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user)
        .currentUser.isAdmin
    ) {
      return JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user)
        .currentUser.isAdmin
    }
  }
  return (
    <Router>
      <Routes>
        {!user && (
          <Route path='/' element={<Login />} />
        )}

        {
          user && isAdmin() && (
            <Route path='/' element={<Layout />}>
              <Route path='' element={<Home />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/user/:userId' element={<User />} />
              <Route path='/newProduct' element={<NewProduct />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/newProduct' element={<NewUser />} />
            </Route>
          )
        }


      </Routes>

    </Router>
  );
}

export default App;
