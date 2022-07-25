import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { UserController } from './controllers/UserController'
import { ProductController } from './controllers/ProductController'
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from './middlewares/verifyToken'

const authController = new AuthController()
const userController = new UserController()
const productController = new ProductController()

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
router.get('/product/find', productController.getAllProducts)

export { router }
