import Manager from './Manager.js'

// const usersRequiredFields = [ 'email', 'password' ]
// export const usersManager = new Manager('./src/data/fs/files/users.json', 'user', usersRequiredFields)

const productsRequiredFields = [ 'title' ]
export const productsManager = new Manager('./src/data/fs/files/products.json', 'product', productsRequiredFields)