import Manager from './Manager.js'

export const usersManager = new Manager('./src/data/fs/files/users.json', 'user')
export const productsManager = new Manager('./src/data/fs/files/products.json', 'product')