import {expect } from 'chai'
import environment from '../../src/utils/env.util.js'
import dao from '../../src/DAO/dao.factory.js'

const { cartsManager } = dao

describe(
    'Testing Carts resource',
    ()=>{
        const cart = {
            user_id: '66b3cea36010d11a9a4cd51d',
            product_id: '668367fef40a13dc22e56d7f',
            product_price: 119.99,
            product_quantity: 1,
            cart_status: 'saved'
        }
        let id = undefined

        it(
            'Cart creation: testing that creation function receives the required argument USER_ID',
            () => {
                expect(cart).to.have.property('user_id')
            }
        )
        it(
            'Cart creation: testing that creation function receives the required argument PRODUCT_ID',
            () => {
                expect(cart).to.have.property('product_id')
            }
        )
        it(
            'Cart creation: testing that creation function receives the required argument CART_STATUS',
            () => {
                expect(cart).to.have.property('cart_status')
            }
        )        
        it(
            'Cart creation: test that the required parameter USER_ID is of type string',
            () => {
                expect(cart.user_id).to.be.a('string')
            }
        )
        it(
            'Cart creation: test that the required parameter PRODUCT_ID is of type string',
            () => {
                expect(cart.product_id).to.be.a('string')
            }
        )
        it(
            'Cart creation: test that the required parameter PRODUCT_QUANTITY is of type number',
            () => {
                expect(cart.product_quantity).to.be.a('number')
            }
        )
        it(
            'Cart creation: test that the creation function returns an object with a valid id',
            async () => {
                const response = await cartsManager.create(cart)
                id = response._id
                expect(response).to.have.property('_id')
            }
        )
        it(
            'Cart update: test that the function update the cart',
            async () => {
                const updatedData = {
                    cart_status: 'submited'
                }
                const one = await cartsManager.readOne(id)
                const response = await cartsManager.update(id, updatedData)
                expect(one.cart_status).is.not.equal(response.cart_status)
            }
        )
        it(
            'Cart delete: test that the function delete the cart',
            async () => {
                await cartsManager.destroy(id)
                const one = await cartsManager.readOne(id)
                expect(one).not.exist
            }
        )
    }
)