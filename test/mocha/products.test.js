import assert from 'assert'
import args from '../../src/utils/args.util.js'
import dao from '../../src/DAO/dao.factory.js'

const { productsManager } = dao

describe(
    'Products resource testing',
    ()=>{
        //Declaración de variables para el test
        const data = {
            title: 'AMD Ryzen 7 CPU',
            photo: 'http://coderserver/storage/images/products/photo1.png',
            category: 'Proccessors',
            description: 'A product description',
            rating: 5,
            price: 199.99,
            stock: 10
        }

        let id = undefined
        
        it(
            'Product creation: testing that creation function receives the required argument TITLE',
            () => {
                assert.ok(data.title)
            }
        )
        it(
            'Product creation: test that the required parameter TITLE is of type string',
            () => {
                assert.strictEqual( typeof data.title, 'string')
            }
        )
        it(
            'Product creation: test that the required parameter category is of type string',
            () => {
                assert.strictEqual( typeof data.category, 'string')
            }
        )
        it(
            'Product creation: test that the created product has an ID',
            async () => {                
                const response = await productsManager.create(data)
                id = response._id
                assert.ok(response._id)
            }
        )
        it(
            'Product update: test that the modified value is different than original value',
            async () => {
                const one = await productsManager.readOne(id)
                const data = { title: 'AMD Ryzen 9 CPU'}
                const response = await productsManager.update(id, data)
                assert.notEqual(one.title, response.title)
            }
        )
        it(
            'Product creation: product test creation deleted',
            async () => {
                const response = await productsManager.destroy(id)
                const one = await productsManager.readOne(id)
                assert.strictEqual(one, null)
            }        
        )
    }
)