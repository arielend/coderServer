class UsersManager {
    
    static #users = []

    create (data) {
        try {
            if(data.email === '' || data.password === ''){
                throw new Error('Los campos email y password son obligatorios')
            }
            else{
                const user = {
                    id: (UsersManager.#users.length === 0) ? 1 : (UsersManager.#users[UsersManager.#users.length -1].id) + 1,
                    photo: data.photo || 'noPhoto',
                    email: data.email,
                    password: data.password,
                    role: 'customer'
                }

                UsersManager.#users.push(user)
                return user
            }            
        } catch (error) {
            console.log('Error al cargar el usuario: ', error)
        }
    }

    read () {
        (UsersManager.#users.length > 0) ? console.log(UsersManager.#users) : console.log('Aún no hay usuarios registrados')
    }
}

const manager = new UsersManager()

const user1 = manager.create({
    photo: 'fotoPerfil_1.jpj',
    email: 'usuario1@mail.com',
    password: '123456'
})

const user2 = manager.create({
    photo: '',
    email: 'usuario2@mail.com',
    password: 'abcdef'
})

const user3 = manager.create({
    photo: 'fotoPerfil_3.jpj',
    email: '',
    password: '123456'
})

const user4 = manager.create({
    photo: 'fotoPerfil_4.jpj',
    email: 'usuario4@mail.com',
    password: ''
})

console.log(manager.read())