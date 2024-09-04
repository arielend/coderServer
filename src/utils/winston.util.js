import { createLogger, format, addColors, transports } from 'winston'
import args from '../utils/args.util.js'

const environment = args.env

const { colorize, simple } = format
const { Console, File } = transports

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 }
const colors = {FATAL : 'red', ERROR: 'yellow', INFO: 'blue', HTTP: 'white'}
addColors(colors)

let logger = {}

switch(environment){
    case 'development':
        logger = createLogger({
            levels,
            format: colorize(),
            transports: [
                new Console({ 
                    level: 'HTTP',
                    format: simple()
                })
            ]
        })
    break

    case 'production':
        
        logger = createLogger({
            levels,
            format: colorize(),
            transports: [
                new Console({ 
                    level: 'HTTP',
                    format: simple()
                }),
                new File({ 
                    level: 'ERROR',
                    format: simple(),
                    filename: './src/utils/errors/productionErrors.log'
                })
            ]
        })
    break

    default:
        
        logger.transports = [
            new Console({ 
                level: 'HTTP',
                format: simple()
            }),
            new File({ 
                level: 'ERROR',
                format: simple(),
                filename: './src/utils/errors/defaultErrors.log'
            })
        ]
    break
}

export default logger