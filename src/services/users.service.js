import Service from '../services/service.js'
import usersRepository from '../repositories/users.repository.js'

const usersService = new Service(usersRepository)
export const { 
    createService,
    destroyService,
    paginateService,
    readLastService,
    readLastByUserService,
    readService,
    readOneService,
    updateService,
    destroyManyService,
    readByEmailService
} = usersService