import * as types from '../types.js'

let state={
    user:{
        err:1
    }
}
let mutations ={
    [types.USER](state,payload){
        state.user=payload
    }
}
export default{
    namespaced: true,
    state,mutations
}