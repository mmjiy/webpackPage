import i18n from "vue-i18n";
import Vue  from 'vue';

import en_US from "@/config/lang/en_US";
import zh_CN from "@/config/lang/zh_CN";
import zh_HK from "@/config/lang/zh_HK";

import Config from "@/config/index";

Vue.use(i18n);

const messages = {
    en_US,
    zh_CN,
    zh_HK
}

export default new i18n({
    locale:Config.lang,
    messages
})

export function change(){

}
