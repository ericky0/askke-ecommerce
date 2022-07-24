import { Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { UserController } from './controllers/UserController'
import { verifyTokenAndAuthorization } from './middlewares/verifyToken'

const authController = new AuthController()
const userController = new UserController()

const router = Router()

// AUTH-CONTROLLER ROUTES
router.post('/auth/register', authController.createUser)
router.post('/auth/login', authController.login)

// USER-CONTROLLER ROUTES

router.put('/user/:id', verifyTokenAndAuthorization, userController.updateUser)
export { router }
