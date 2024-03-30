import { Router } from 'express'
import productsRouter from '../api/products.api.js'

const viewsRouter = Router()

viewsRouter.use('/products', productsRouter)

export default viewsRouter