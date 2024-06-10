import Service from './service.js'
import productsManager from '../data/mongo/managers/productsManager.js'

const productsService = new Service(productsManager)
export const {
    createService,
    destroyService,
    paginateService,
    readOneService,
    readService,
    updateService,
    readLastInsertionService,
    readLastUserInsertionService
} = productsService