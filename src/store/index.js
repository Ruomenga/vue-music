import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)

import * as actions from './actions'
import state from './state'
import * as getters from './getters'
import mutations from './mutations'


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store