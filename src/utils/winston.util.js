import { createLogger, format, addColors, transports } from 'winston'
import argsUtil from '../utils/args.util.js'

const environment = argsUtil.env

const { colorize, simple } = format
const { Console, File } = transports

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 }
const colors = {FATAL : 'red', ERROR: 'yellow', INFO: 'blue', HTTP: 'white'}
addColors(colors)

let logger = {}

switch(environment){
    case 'development':
        console.log('Using Development logger.')
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
        console.log('Using Production logger.')
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
        console.log('Default logger.')
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