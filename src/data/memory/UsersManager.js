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
        try {
            if(UsersManager.#users.length > 0) {
                console.log('Todos los usuarios: ', UsersManager.#users)
            } else {
                const error = new Error('No hay usuarios que mostrar')
                throw error
            }
            
        } catch (error) {
            console.log(`An error has ocurred while calling read method: ${error}`)
        }        
    }

    readOne (id) {
        try {

            if(!id) {
                const error = new Error('The ID argument is required while calling de readOne method.')
                throw error
            } else {

                if(UsersManager.#users.length > 0) {
                    const one = UsersManager.#users.find ( user => user.id === id)
                    one ? console.log('Usuario encontrado: ', one) : console.log('No se ha encontrado el usuario')
                } else {
                    console.log('No hay usuarios guardados.')
                }                
            }
            
        } catch (error) {
            console.log(`An error has ocurred while calling readOne method: ${error}`)
        }
    }

    destroyOne (id) {
        try {

            if(!id) {
                const error = new Error('The ID argument is required while calling de destroyOne method.')
                throw error
            } else {

                if(UsersManager.#users.length > 0) {
                    const one = UsersManager.#users.find ( user => user.id === id)
                    if(one){

                        UsersManager.#users = UsersManager.#users.filter(user => user.id !== id)
                        console.log('se ha eliminado el usuario: ', one)

                    } else {
                        console.log('No se ha encontrado el usuario')
                    }
                    
                } else {
                    console.log('No hay usuarios guardados.')
                }
            }
            
        } catch (error) {
            console.log(`An error has ocurred while calling destroyOne method: ${error}`)            
        }
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

manager.read()

manager.readOne(2)

manager.readOne(7)

manager.destroyOne(6)

manager.destroyOne(2)

setTimeout(()=>{
    manager.read()
}, 2000)