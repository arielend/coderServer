import Service from './Service.js'
import usersRepository from '../repositories/users.repository.js'

const usersService = new Service(usersRepository)
export const {
    createService,
    readByEmailService,
    readOneService,
    updateService,
    destroyService
} = usersService