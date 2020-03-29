import {get} from '../service.js'
import * as types from '../types.js'

let state ={
    banner:[]
}
let actions ={
    [types.BANNER]({commit,state},payload){
        get({apiname:'banner',params:{_page:1,_limit:5}}).then(
            result=>commit('BANNER',result)
        )
    }
}
let mutations ={
    [types.BANNER](state,payload){
        state.banner=payload
    }
}
export default {
    namespaced: true,
    state,actions,mutations
}