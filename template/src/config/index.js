const env = process.env;

export default {
    "lang":"en_US",
    "api":{
        //域名
        "host":env.API.HOST,
        //协议
        "protocol":env.API.PROTOCOL,
        //端口
        "port":env.API.PORT,
        //路径
        "path":env.API.PATH,
        //mock数据是否返回false
        "mockFail":false,
        //是否使用mock
        "mock":false,
        //各模块mock使用
    },
}
