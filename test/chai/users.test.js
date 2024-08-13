import { expect } from 'chai'
import environment from '../../src/utils/env.util.js'
import dao from '../../src/DAO/dao.factory.js'

const { usersManager } = dao

describe(
    'Testing Users resource',
    ()=>{
        const user = {
            email: 'arielendrizzi.test@gmail.com',
            username: 'Ariel Endrizzi',
            bio: 'This is my colorful user bio',
            password: 'Hola1234',
            verified: true,
            verifyCode: '894a09bff48bc5a3a3dcdae9',
            photo: 'https://coderserver/files/user1.jpg',
            role: 'customer'
        }
        let id = undefined

        it(
            'User creation: testing that creation function receives the required argument EMAIL',
            () => {
                expect(user).to.have.property('email')
            }
        )
        it(
            'User creation: test that the required parameter EMAIL is of type string',
            () => {
                expect(user.email).to.be.a('string')
            }
        )
        it(
            'User creation: testing that creation function receives the required argument PASSWORD',
            () => {
                expect(user).to.have.property('password')
            }
        )
        it(
            'User creation: test that the required parameter PASSWORD is of type string',
            () => {
                expect(user.password).to.be.a('string')
            }
        )
        it(
            'User creation: test that the creation function returns an object with a valid id',
            async () => {
                const response = await usersManager.create(user)
                id = response._id
                expect(response).to.have.property('_id')
            }
        )
        it(
            'User update: test that the function update the user',
            async () => {
                const updatedData = {
                    username: 'new username'
                }
                const one = await usersManager.readOne(id)
                const response = await usersManager.update(id, updatedData)
                expect(one.username).is.not.equal(response.username)
            }
        )
        it(
            'User delete: test that the function delete the user',
            async () => {
                await usersManager.destroy(id)
                const one = await usersManager.readOne(id)
                expect(one).not.exist
            }
        )
    }
)