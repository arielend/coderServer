import fs from 'fs'
import crypto from 'crypto'

class UsersManager{
    constructor(){
        this.path = './src/data/fs/files/users.json';
        this.init();
    }
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log('Archivo creado');
        } else {
            console.log('Archivo ya existe');
        }
    }
    async create(data){
        try{
            if(!data.photo || !data.email || !data.password ){
                const error = new Error('Ingrese todos los datos');
                throw error;
            }else{
                const user = {
                    id: crypto.randomBytes(12).toString('hex'),
                    photo: data.photo || 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
                    email: data.email,
                    password: data.password,
                    rol: 'customer'
                }
                let all = await fs.promises.readFile(this.path, 'utf-8')
                all = JSON.parse(all)
                all.push(user)
                all = JSON.stringify(all, null, 2)
                await fs.promises.writeFile(this.path, all)
                console.log({created: user.id})
                return user
            }
        }catch(error){
            throw error;
        }
    }
    async read(rol = null){
        try{   
            let all = await fs.promises.readFile(this.path, 'utf-8');
            all = JSON.parse(all);
            rol && (all = all.filter(each=>each.rol===rol))
            if(all.length === 0){
                throw new Error("No hay usuarios");
            }else{
                console.log(all)
                return all
            }
        }catch(error){
            console.log(error)
            return []
        }
    }
    async readOne(id){
        try{   
            let all = await fs.promises.readFile(this.path, 'utf-8');
            all = JSON.parse(all);
            let user = all.find((each)=>each.id===id);
            if(!user){
                throw new Error('Usuario no encontrado')
            }else{
                console.log(user);
                return user;
            }
        }catch(error){
            console.log(error);
        }
    }
    async update(id, data){
        try{
            let all = await this.read()
            let one = all.find(each=>each.id===id)
            if (one){
                for(let prop in data){
                    one[prop] = data[prop]
                }
            }
            all = JSON.stringify(all, null,2)
            await fs.promises.writeFile(this.path, all)
            return one
        }catch(error){
            throw error
        }
    }
    async destroy(id){
        try{   
            let all = await fs.promises.readFile(this.path, 'utf-8');
            all = JSON.parse(all);
            let user = all.find(each=>each.id===id);
            if(!user){
                throw new Error('Usuario no encontrado')
            }else{
                let filtered = all.filter(each=>each.id!==id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path,filtered)
                console.log({deleted: user.id});
                return user;
            }
        }catch(error){
            console.log(error);
        }
    }
}

const usersManager = new UsersManager();
export default usersManager