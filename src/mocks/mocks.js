import createProduct from './products.mock.js'
import createUser from './users.mock.js'

for(let i = 0; i < 4; i++) {
    createUser()
}

for(let i = 0; i < 999; i++) {
    createProduct()
}