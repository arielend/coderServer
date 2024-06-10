import Service from '../services/service.js'
import cartsManager from '../data/mongo/managers/cartsManager.js'

const cartsService = new Service(cartsManager)
export const { 
    createService,
    destroyService,
    paginateService,
    readLastInsertionService,
    readLastUserInsertionService,
    readService,
    readOneService,
    updateService,
    destroyManyService
    
} = cartsService
