import Service from './service.js'
import productsRepository from '../repositories/products.repository.js'

const productsService = new Service(productsRepository)
export const {
    createService,
    destroyService,
    paginateService,
    readOneService,
    readService,
    updateService,    
    readLastService,
    readLastByUserService,    
    destroyManyService
} = productsService