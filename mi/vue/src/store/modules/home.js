import {get} from '../service.js'
import * as types from '../types.js'

let state = {
    home:[]
}
let actions ={
    [types.HOME]({commit,state},payload){
        get({apiname:'home',params:{_page:1,_limit:8}}).then(
            result=>commit('HOME',result)
        )
    }
}
let mutations ={
    [types.HOME](state,payload){
        state.home = payload
    }
}

export default{
    namespaced: true,
    state,actions,mutations
}