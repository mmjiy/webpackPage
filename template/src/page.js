// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import globalAll from "@/global";
import yToast from "Yui/yToast";
import yDialog from "Yui/yDialog";
import i18n from "@/i18n";
import store from "@/store";
import urlParams from "@/common/plugins/urlParams";
import jump from "@/common/plugins/jump";

Vue.config.productionTip = false


/** store */

globalAll.init();

let zindex = 9999;
Vue.use(yToast,{
    getZIndex(){
        return zindex++;
    }
});
Vue.use(yDialog,{
    getZIndex(){
        return zindex++;
    }
});

Vue.use(urlParams);
Vue.use(jump);



export default (page)=>{
    return new Vue({
        el: '#app',
        i18n,
        store,
        components: { App:page,yDialog,yToast },
        template: '<div><y-dialog></y-dialog><y-toast></y-toast><App/></div>',
    })
}


