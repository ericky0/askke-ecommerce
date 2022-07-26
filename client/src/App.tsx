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


function App() {
  const user = true
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={
            user // there's a user?
            ? <Navigate to='/' /> 
            : <Register />
          }/>
          <Route path='/login' element={
            user // there's a user?
            ? <Navigate to='/' /> 
            : <Login />
          }/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/products/:category' element={<ProductList/>}/>
        </Routes>
      </Router>
  );
}

export default App;
