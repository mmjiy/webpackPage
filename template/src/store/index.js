import Vue from 'vue'
import Vuex from "vuex";


Vue.use(Vuex);
let store = new Vuex.Store({
    debug: 1,
    state: {
        //areaCodeList: [],
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        //uber
    }
});

window.store = store;

export default store;
