import Service from './service.js'
import cartsRepository from '../repositories/carts.repository.js'

const cartsService = new Service(cartsRepository)
export const {
    createService,
    destroyService,
    destroyManyService,
    readService,
    readOneService,
    updateService
} = cartsService
