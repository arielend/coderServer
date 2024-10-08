import CustomRouter from '../CustomRouter.js'
import { Types } from 'mongoose'

import cartsManager from '../../DAO/mongo/managers/cartsManager.js'
import ticketsManager from '../../DAO/mongo/managers/ticketsManager.js'

class TicketsRouter extends CustomRouter {

    init() {
        this.create('/', ['CUSTOMER', 'PREM'], create)
        this.read('/', ['ADMIN', 'CUSTOMER', 'PREM'], read)
        this.readOne('/:id', ['ADMIN', 'CUSTOMER', 'PREM'], readOne)
    }
}
const ticketsRouter = new TicketsRouter()
export default ticketsRouter.getRouter()

async function create (request, response, next) {
    try {
        const { _id } = request.user

        const ticket = await cartsManager.aggregate([
            {
                $match:{
                    user_id: new Types.ObjectId(_id)
                }
            },
            {
                $lookup:{
                    foreignField: "_id", 
                    from: 'products', 
                    localField: 'product_id', 
                    as: 'product_id'
                }
            },
            {
                $replaceRoot:{
                    newRoot:{
                        $mergeObjects: [{ $arrayElemAt: ["$product_id", 0]}, "$$ROOT"]
                    }
                }
            },
            {
                $set: {
                    subTotal: { 
                        $multiply: ["$product_quantity", "$price" ]
                    }
                }
            },
            {
                $group: {
                    _id: "$user_id",
                    total: { $sum: "$subTotal"}
                }
            },
            {
                $project: {
                    _id: 0,
                    user_id: "$_id",
                    total: "$total",
                    ticket_status: 'created',
                    date: new Date()
                }
            },
            {
                $merge: {
                    into: "tickets"
                }
            }
            
        ])

        await cartsManager.destroyMany(_id)
        const lastTicket = await ticketsManager.readLastByUser(_id)

        return response.message201(`Ticket ${lastTicket._id} created at ${lastTicket.date}!`)        
    } catch (error) {
        return next(error)
    }
}

async function read (request, response, next ) {
    try {
        const { _id } = request.user
        const filter = { user_id: _id}
        const userTickets = await ticketsManager.read(filter)        
        
        if(userTickets.length > 0){
            return response.response200(userTickets)
        }
        else{
            return response.error404()
        }
        
    } catch (error) {
        return next(error)
    }
}

async function readOne (request, response, next ) {
    try {
        
        const { ticket_id } = request.body
        const ticket = await ticketsManager.readOne(ticket_id)

        if(ticket){
            return response.response200(ticket)
        }
        else{
            return response.error404()
        }
        
    } catch (error) {
        return next(error)
    }
}