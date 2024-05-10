import { Router } from "express"
import cartsManager from "../../data/mongo/managers/cartsManager.js";
import { Types } from "mongoose";

const ticketsRouter = Router()

ticketsRouter.get('/:id', async (request, response, next) => {
    try {
        const { id } = request.params

        const ticket = await cartsManager.aggregate([
            {
                $match:{
                    user_id: new Types.ObjectId(id)
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
                    date: new Date()
                }
            },
            {
                $merge: {
                    into: "tickets"
                }
            }
        ])
        return response.json({
            statusCode: 200,
            response: ticket
        })
    } catch (error) {
        return next(error)
    }
})

export default ticketsRouter