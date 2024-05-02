import express,{Router} from 'express'
import UserController from '../controllers/userController'
import Authenticator from '../middlerware/authentication'
const router:Router=express.Router()
router.route('/signup').post(UserController.signUp)
router.route('/login').post(UserController.login)


export default router