import Service from './Service.js'
import productsRepository from '../repositories/products.repository.js'

const productsService = new Service(productsRepository)
export const {
    createService,
    destroyService,
    paginateService,
    readService,
    readOneService,
    updateService,
    readLastService
} = productsService