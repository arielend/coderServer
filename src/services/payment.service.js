import Service from './service.js'
import paymentRepository from '../repositories/payment.repository.js'

const PaymentService = new Service(paymentRepository)
export const {
    createService,
    readOneService
} = PaymentService