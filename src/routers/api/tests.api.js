import { Router } from 'express'

const testRouter = Router()

testRouter.get('/simplex', simplexTest)
testRouter.get('/complex', complexTest)
testRouter.post('/simplex', simplexTest)
testRouter.post('/complex', complexTest)

function simplexTest (request, response, next) {
    try {
        let total = 1
        for (let i = 0; i < 100; i++){
            total = i * i
        }
        return response.message200(total)
    } catch (error) {
        return next(error)
    }
}


function complexTest (request, response, next) {
    try {
        let total = 1
        for (let i = 0; i < 5000000000; i++){
            total = i * i
        }
        return response.message200(total)
    } catch (error) {
        return next(error)
    }
}

export default testRouter