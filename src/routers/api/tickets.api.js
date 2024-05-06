import { Router } from "express"
import cartsManager from "../../data/mongo/managers/cartsManager";
import { Types } from "mongoose";   

const ticketsRouter = Router()

ticketsRouter.get('/:uid', async(req, res, next) => {
    try{
        const{ uid } = req.params
        const ticket = await cartsManager.aggregate([
            {
                $match: {
                    user_id: new Types.ObjectId (uid),
                },
            },
        ])
        return res.json({
            statusCode: 200,
            response: ticket,
        })
    }catch(error){
        return next(error)
    }
})

export default ticketsRouter