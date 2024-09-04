import Service from './service.js'
import usersRepository from '../repositories/users.repository.js'

const usersService = new Service(usersRepository)
export const {
    createService,
    readByEmailService,
    readOneService,
    updateService,
    destroyService
} = usersService
