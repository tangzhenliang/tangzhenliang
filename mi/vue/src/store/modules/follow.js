import {get} from '../service.js'
import * as types from '../types.js'

let state ={
    follow:[]
}
let actions ={
    [types.FOLLOW]({commit,state},payload){
        get({apiname:'follow',params:{_page:1,_limit:8}}).then(
            result=>commit("FOLLOW",result)
        )
    }
}
let mutations={
    [types.FOLLOW](state,payload){
        state.follow=payload
    }
}
export default {
    namespaced: true,
    state,actions,mutations
}