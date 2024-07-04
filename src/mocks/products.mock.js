import { faker } from '@faker-js/faker'
import '../utils/env.util.js'
import dbConnect from '../utils/dbConnection.js'
import productsRepository from '../repositories/products.repository.js'

async function createProduct () {
    try {
        dbConnect()
        const product = {
            title: faker.commerce.product(),
            photo: faker.image.urlLoremFlickr({ category: 'technics' }),
            category: faker.commerce.department(),
            rate: 4,
            price: 0,
            stock: 1
        }
        await productsRepository.create(product)        
    } catch (error) {
        console.log(error)
    }
}

export default createProduct