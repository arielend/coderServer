import { faker } from '@faker-js/faker'
import '../utils/env.util.js'
import dbConnect from '../utils/dbConnection.util.js'
import usersRepository from '../repositories/users.repository.js'
import { createHash } from '../utils/hash.util.js'

async function createUser () {
    try {
        dbConnect()
        const user = {
            username: faker.person.fullName(),
            bio: faker.person.bio(),
            password: createHash('1234ab'),
            verified: true,
            photo: faker.image.avatar()
        }
        user.email = limpiarString(user.username).toLowerCase() + '@mail.com',
        await usersRepository.create(user)        
    } catch (error) {
        console.log(error)
    }
}

function limpiarString(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}

export default createUser