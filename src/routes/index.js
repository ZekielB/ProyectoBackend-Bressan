import { Router } from "express";
import userRouter from "./user-router.js"
import productRouter from "./product-router.js"
import cartRouter from "./cart-router.js"


const router = Router()

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/carts', cartRouter)


export default router