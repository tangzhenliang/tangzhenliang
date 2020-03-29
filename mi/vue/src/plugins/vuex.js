import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import actions from '../store/actions'
import mutations from '../store/mutations'
import state from '../store/state'
import getters from '../store/getters'

import home from '../store/modules/home.js'
import banner from '../store/modules/banner.js'
import column from '../store/modules/column.js'
import follow from '../store/modules/follow.js'
import detail from '../store/modules/detail.js'
import user from '../store/modules/user.js'

let store = new Vuex.Store({
    actions,mutations,state,getters,
    modules:{
        home,banner,column,follow,detail,user
    }

})

export default store