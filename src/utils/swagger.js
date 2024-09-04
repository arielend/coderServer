import __dirname from '../../utils.js'

const options = {
    
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Coderserver',
            description: 'Coderserver project documentation.'
        }
    },
    apis: [__dirname + '/src/docs/*.yaml'],
    swaggerOptions:{
        withCredentials: true
    }
}

export default options