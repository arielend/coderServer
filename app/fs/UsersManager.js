const fs = require("fs");
const crypto = require("crypto");

class UsersManager{
    constructor(){
        this.path = './files/users.json';
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
                    photo: data.photo || 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png',
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
    async read(){
        try{   
            let all = await fs.promises.readFile(this.path, 'utf-8');
            all = JSON.parse(all);
            if(all.length === 0){
                throw new Error("No hay usuarios");
            }else{
                console.log(all)
                return all
            }
        }catch(error){
            console.log(error)
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

const users = new UsersManager();

async function test(){
    try{
        const users = new UsersManager();
        await users.create({photo: "./photo.jpg", 
                        email:"abc@abc.com", 
                        password:"abc123"});
        await users.read();
        await users.readOne('90f5a220800ff6c2f5650b8a');
        await users.destroy('90f5a220800ff6c2f5650b8a');
        }catch(error){
            console.log(error);
        }
}

test();