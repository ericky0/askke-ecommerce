import './style.css'

import Cart from "./pages/Cart";
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Navigate
} from "react-router-dom";
import Success from './pages/Success';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector((state: RootState) => state.user.currentUser)
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={
            user// there's a user?
            ? <Navigate to='/' /> 
            : <Register />
          }/>
          <Route path='/login' element={
            user// there's a user?
            ? <Navigate to='/' />
            : <Login /> 

          }/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/products/:category' element={<ProductList/>}/>
        </Routes>
      </Router>
  );
}

export default App;
