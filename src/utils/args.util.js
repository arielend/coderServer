import { Command } from 'commander'

const args = new Command()

args.option('--port <port>', 'port', '8080')
args.option('--env <env>', 'environment', 'development')
args.option('--pers <pers>', 'persistence', 'mongo')

args.parse()
export default args.opts()