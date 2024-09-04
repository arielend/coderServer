import Service from './service.js'
import repository from '../repositories/carts.repository.js'

const ExampleService = new Service(repository)
export const {
    createService,
    destroyService,
    destroyManyService,
    paginateService,
    readService,
    readByEmailService,
    readLastService,
    readLastByUserService,
    readOneService,
    updateService
} = ExampleService
