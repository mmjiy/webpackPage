const path = require('path');
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '~@': resolve('src'),
            "Config":resolve('src/config'),
            "Log":resolve("src/common/log"),
            //"Request":resolve('src/request'),
            "Platform":resolve('yesaway_platform'),
            "Request":resolve("src/request"),
            'Yui':resolve('node_modules/yesaway-wui/src/components')
        }
    },
    yesawayUiConfig:{
        varScss:"src/css/topic.scss"
    }
};
