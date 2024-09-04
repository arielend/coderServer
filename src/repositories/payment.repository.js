import Stripe from 'stripe'
import dao from '../DAO/dao.factory.js'
import environment from '../utils/env.util.js'
import CheckoutProductsDTO from '../DTO/checkoutProducts.dto.js'

const { cartsManager } = dao
const stripe = new Stripe(environment.STRIPE_SECRET_KEY)

class PaymentRepository {

    create = async (user_id) => {
        try {
            const userCarts = await cartsManager.read({user_id})
            const productsToCheckout = userCarts.map((product)=>(
                new CheckoutProductsDTO(product)
            ))            
            const line_items = productsToCheckout
            const mode = 'payment'
            const success_url = `http://localhost:5173/thanks?session_id={CHECKOUT_SESSION_ID}`
            const cancel_url = 'http://localhost:5173/product'
            const intent = await stripe.checkout.sessions.create({
                line_items,
                mode,
                success_url,
                cancel_url
            })            
            return intent            
        } catch (error) {
            throw error
        }
    }
    
    readOne = async (session_id) => {
        try {
            const order = await stripe.checkout.sessions.retrieve(session_id) 
            return order
        } catch (error) {
            throw error
        }
    }

    read = async (filter={}) => {
        try {
            const all = await this.manager.read(filter)
            return all            
        } catch (error) {
            throw error
        }
    }
}

const paymentRepository = new PaymentRepository()
export default paymentRepository