import { config } from 'dotenv'
import args from './args.util.js'

const { env } = args
let path

switch(env) {
    case 'development':
        path = './.env.dev'
    break
    case 'testing':
        path = './.env.test'
    break
    case 'production':
        path = './.env'
    break
    default:
        path = './.env.dev'
}

config({ path })

const environment = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    SECRET_COOKIE: process.env.SECRET_COOKIE,
    SECRET_SESSION: process.env.SECRET_SESSION,
    SECRET_JWT: process.env.SECRET_JWT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    URL_BASE: process.env.URL_BASE,
    URL_BASE_FRONT: process.env.URL_BASE_FRONT,
    FRONT_PORT: process.env.FRONT_PORT
}

export default environment