import supertest from 'supertest'
import { expect } from 'chai'
import environment from '../../src/utils/env.util.js'
import dao from '../../src/DAO/dao.factory.js'

const { usersManager } = dao

const requester = supertest(`http://localhost:${environment.PORT}/api`)

describe(
    'Testing Coderserver App',
    function () {
        this.timeout(20000)
        const user = {
            email: 'arielendrizzi.test@gmail.com',
            username: 'ariel end test',
            password: 'Hola1234',
            verified: true,
            verifyCode: 'ABCDEF1234567890',            
            role: 'admin'
        }

        const product = {
            title: 'product title',
            category: 'product category',
            price: 199.99,
            stock: 10,
            rating: 5
        }

        let token = undefined

        it(
            'User register',
            async () => {
                const response = await requester.post('/sessions/register').send(user)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            'User login',
            async () => {
                const response = await requester.post('/sessions/login').send(user)
                const { _body, headers } = response
                console.log('El body: ', _body)
                console.log('Los headers: ', headers)
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            'User delete',
            async () => {
                const one = await usersManager.readByEmail(user.email)
                const response = await requester.delete('/users/' + one._id)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(200)
            }
        )
    }
)