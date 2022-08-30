import { merge } from "lodash";
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
    env, 
    isDev: env === 'development',
    isProd: env === 'production',
    port: 3000,
}

let envConfig = {}

switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev').config
        break
    case 'prod':
    case 'production':
        envConfig = require('./prod').config
        break
}

export default merge(baseConfig, envConfig)