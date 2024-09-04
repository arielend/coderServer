import { expect } from 'chai'
import environment from '../../src/utils/env.util.js'
import dao from '../../src/DAO/dao.factory.js'

const { productsManager } = dao

describe(
    'Testing Products resource',
    ()=>{
        const product = {
            title: 'AMD Ryzen 9',
            category: '668367fef40a13dc22e56d7f',
            photo: 'https://coderserver/files/product1.jpg',
            description: '',
            rating: 5,
            price: 119.99,
            stock: 1
        }
        let id = undefined

        it(
            'Product creation: testing that creation function receives the required argument TITLE',
            () => {
                expect(product).to.have.property('title')
            }
        )        
        it(
            'Product creation: test that the required parameter TITLE is of type string',
            () => {
                expect(product.title).to.be.a('string')
            }
        )
        it(
            'Product creation: test that the required parameter CATEGORY is of type string',
            () => {
                expect(product.category).to.be.a('string')
            }
        )
        it(
            'Product creation: test that the required parameter TITLE is of type string',
            () => {
                expect(product.title).to.be.a('string')
            }
        )
        it(
            'Product creation: test that the creation function returns an object with a valid id',
            async () => {
                const response = await productsManager.create(product)
                id = response._id
                expect(response).to.have.property('_id')
            }
        )
        it(
            'Product update: test that the function update the product',
            async () => {
                const updatedData = {
                    title: 'Updated title'
                }
                const one = await productsManager.readOne(id)
                const response = await productsManager.update(id, updatedData)
                expect(one.title).is.not.equal(response.title)
            }
        )
        it(
            'Product delete: test that the function delete the product',
            async () => {
                await productsManager.destroy(id)
                const one = await productsManager.readOne(id)
                expect(one).not.exist
            }
        )
    }
)