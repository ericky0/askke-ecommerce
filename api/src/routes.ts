import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { UserController } from './controllers/UserController'
import { ProductController } from './controllers/ProductController'
import { CartController } from './controllers/CartController'
import { OrderController } from './controllers/OrderController'
import { StripeController } from './controllers/StripeController'
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken
} from './middlewares/verifyToken'

const authController = new AuthController()
const userController = new UserController()
const productController = new ProductController()
const cartController = new CartController()
const orderController = new OrderController()
const stripeController = new StripeController()

const router = Router()

// AUTH-CONTROLLER ROUTES
router.post('/auth/register', authController.createUser)
router.post('/auth/login', authController.login)

// USER-CONTROLLER ROUTES

router.put('/user/:id', verifyTokenAndAuthorization, userController.updateUser)
router.delete(
  '/user/:id',
  verifyTokenAndAuthorization,
  userController.deleteUser
)
router.get('/user/find/:id', verifyTokenAndAdmin, userController.getUser)
router.get('/user/findall', verifyTokenAndAdmin, userController.getAllUsers)
router.get('/user/status', verifyTokenAndAdmin, userController.getUserStats)

// PRODUCT-CONTROLLER ROUTES

router.post('/product', verifyTokenAndAdmin, productController.newProduct)
router.put('/product/:id', verifyTokenAndAdmin, productController.updateProduct)
router.delete(
  '/product/:id',
  verifyTokenAndAdmin,
  productController.deleteProduct
)
router.get('/product/find/:id', productController.getProduct)

// queries over there =)
router.get('/product/find', productController.getAllProducts)

// CART-CONTROLLER ROUTES

router.post('/cart', verifyToken, cartController.newCart)
router.put('/cart/:id', verifyTokenAndAuthorization, cartController.updateCart)
router.delete(
  '/cart/:id',
  verifyTokenAndAuthorization,
  cartController.deleteCart
)
// req.params.id should be => USER ID /// not CART ID
router.get(
  '/cart/find/:id',
  verifyTokenAndAuthorization,
  cartController.getCart
)
router.get('/cart/find/all', verifyTokenAndAdmin, cartController.getAllCarts)

// ORDER-CONTROLLER ROUTES

router.post('/order', verifyToken, orderController.newOrder)
router.put('/order/:id', verifyTokenAndAdmin, orderController.updateOrder)
router.delete('/order/:id', verifyTokenAndAdmin, orderController.deleteOrder)
// req.params.id should be => USER ID /// not ORDER ID
router.get(
  '/order/find/:id',
  verifyTokenAndAuthorization,
  orderController.getOrder
)
router.get('/order/findall', verifyTokenAndAdmin, orderController.getAllOrders)
router.get('/order/monthly', verifyTokenAndAdmin, orderController.getMonthly)

// STRIPE
router.post('/stripe/payment', stripeController.payment)

export { router }
