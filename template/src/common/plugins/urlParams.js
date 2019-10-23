import Vue from "vue";
export default {
    install(){
        Object.defineProperty(Vue.prototype, '$url', {
            get () {
                let url = decodeURIComponent(location.search); //获取url中"?"符后的字串
                let theRequest = {};
                if (url.indexOf("?") != -1) {
                    let str = url.substr(1);
                    let strs = str.split("&");
                    for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }
        })
    }
}
