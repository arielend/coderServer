import { expect } from 'chai'
import dao from '../../src/DAO/dao.factory.js'

describe(
    'Testing Users resource',

    ()=>{
        const data = {
            email: 'user@mail.com',
            username: 'username',
            bio: 'user bio',
            password: 'user password',
            verified: true,
            verifyCode: 'verify code',
            photo: 'user profile photo url',
            role: 'customer'
        }
        let id = undefined

        it(
            'Product creation: testing that creation function receives the required argument EMAIL',
            () => {
                expect(data).to.have.property('email')
            }
        )
        it(
            'Product creation: test that the required parameter EMAIL is of type string',
            () => {
                expect(data.email).to.be.a('string')
            }
        )
    }
)