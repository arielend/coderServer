import Service from '../services/service.js'
import cartsRepository from '../repositories/carts.repository.js'

const cartsService = new Service(cartsRepository)
export const { 
    createService,
    destroyService,
    paginateService,
    readLastService,
    readLastByUserService,
    readService,
    readOneService,
    updateService,
    destroyManyService
} = cartsService
