import {get} from '../service.js'
import * as types from '../types.js'

let state ={
    column:[]
}
let actions ={
    [types.COLUMN]({commit,state},payload){
        get({apiname:'column',params:{_page:1,_limit:8}}).then(
            result=>commit('COLUMN',result)
        )
    }
}
let mutations ={
    [types.COLUMN](state,payload){
        state.column=payload
    }
}

export default{
    namespaced: true,
    state,actions,mutations
}