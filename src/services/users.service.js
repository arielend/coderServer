import Service from '../services/service.js'
import usersManager from '../data/mongo/managers/usersManager.js'

const userService = new Service(usersManager)
export const {
    readOneService,
    updateService 
} = userService