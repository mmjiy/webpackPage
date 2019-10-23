'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API: {
        //HOST: "'service-api.imdo.co'",
        //HOST: "'service-api.imdo.co'",
        HOST: "'service-api-release.yesaway.cn'",
        //HOST: "'service-api.yesaway.cn'",
        //HOST: "'service-api-beta.yesaway.com'",
        PROTOCOL: "'http://'",
        PATH: "'/v1_1'"
    },
})
