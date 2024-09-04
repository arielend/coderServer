import Service from './Service.js'
import ordersRepository from '../repositories/orders.repository.js'

const ordersService = new Service(ordersRepository)
export const {
    createService,
    readService,
    readOneService,
    updateService
} = ordersService