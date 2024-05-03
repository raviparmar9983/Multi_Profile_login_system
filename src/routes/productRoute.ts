import express,{Router} from 'express'
import ProductController from '../controllers/productController'

const router:Router=express.Router()

router.route('/product')
.get(ProductController.getAllProduct)
.post(ProductController.createProduct)


router.route('/product/:id')
.delete(ProductController.deleteProduct)
.patch(ProductController.updateProduct)


export default router
