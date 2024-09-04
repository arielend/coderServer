import supertest from 'supertest'
import { expect } from 'chai'
import environment from '../../src/utils/env.util.js'
import dao from '../../src/DAO/dao.factory.js'

const { usersManager , productsManager } = dao

const requester = supertest(`${environment.URL_BASE}:${environment.PORT}/api`)

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
        let id = undefined

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
                token = headers['set-cookie'][0].split(';')[0]
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            'Product creation',
            async () => {
                const response = await requester.post('/products/').send(product).set('Cookie', token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(201)
            }
        )
        it(
            'Product deletion by admin user',
            async () => {
                const one = await productsManager.readLast()
                id = one._id
                console.log('El id del ultimo creado es: ', id)
                const response = await requester.delete(`/products/${id}`).set('Cookie', token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(204)
            }
        )
        it(
            'Product deletion tried by an user not logged in',
            async () => {
                const one = await productsManager.readLast()
                id = one._id
                console.log('El id del ultimo creado es: ', id)
                const response = await requester.delete(`/products/${id}`)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(401)
            }
        )
        it(
            'User signout',
            async () => {
                const data = { user :{ online: true} }
                const response = await requester.post('/sessions/signout').send(data).set("Cookie", token)
                const { _body } = response
                console.log('El body en test signout: ', _body)
                expect(_body.statusCode).to.be.equals(200)
            }
        )
        it(
            'User deletion',
            async () => {
                const one = await usersManager.readByEmail(user.email)
                const response = await requester.delete('/sessions/' + one._id).set('Cookie', token)
                const { _body } = response
                expect(_body.statusCode).to.be.equals(204)
            }
        )
    }
)