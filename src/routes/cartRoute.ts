import express,{Router} from 'express'
import Authenticator from '../middlerware/authentication'
import CartController from '../controllers/CartController'
import Cart from '../models/cartModel'

const authenticate=new Authenticator()

const router:Router=express.Router()

router.route('/').post(authenticate.authenticate,authenticate.userAuthenticate,authenticate.profileAuthenticate,CartController.addItemToCart)

export default router