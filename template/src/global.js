import {requestOn,requestConfig} from "yesaway_request/request/base/request";
import config from "Config";
import server from "@/service/server";

const storageAreaList = "areaCodeList";

function configRequest(){
    requestOn("beforeSend",(opt,type)=>{
        if(type == "normal" || type == "file"){
            if(opt.url){
                opt.url = server.resolveUrl(opt.url);
            }

            opt.header = opt.header || {};
            if(opt.token){
                opt.header["Access-token"] = store.getters["user/accessToken"] || "";
            }
            //opt.header["Client-Id"] = "yesaway_mina_cn_wechat_way";
            opt.data = opt.data || {};
            opt.data.lang = config.lang;
        }
        return opt;
    })

    requestOn("error",(error)=>{
        //error && log.apiError(error.req.url,error.req.data,error.res);
    })

    requestOn("afterSend",data =>{
        if(data && data.req){
            //log.api(data.req.url,data.req.data || {},data.res || {});
        }

    })
    requestConfig.mock = config.api.mock;
    requestConfig.mockFail = config.api.mockFail
}

const out = {
    init(){

        //配置请求模块
        configRequest();

        requestConfig.mock = config.api.mock;
        requestConfig.mockFail = config.api.mockFail
        //serviceConfig.init();
    },
}
export default out;
