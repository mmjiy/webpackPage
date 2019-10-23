import Vue from "vue";
import menuConfig from "Config/menuConfig";

const router = menuConfig.router;
const $ = require("jquery")

export default {
    install(){
        Object.defineProperty(Vue.prototype, '$jump', {
            get () {
                return {
                    replace(name,query){
                        if(router[name]) {
                            query = query || {};
                            let str = "";
                            $.each(query, (index, item) => {
                                str += index + "=" + item + "&";
                            })
                            window.location.href =router[name].link+"?"+str;
                        }
                    }
                }
            }
        })
    }
}
