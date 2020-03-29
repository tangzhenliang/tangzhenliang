import axios from "../plugins/axios"

let actions = {
    banner({commit},payload){
        axios({
            url:'/api/goods/banner',
            params:{_page:1,_limit:5},
        }).then(
            res=>commit('banner',res.data.data)
        )
    },
    home({commit},payload){
        axios({
            url:'/api/goods/home',
            params:{_page:1,_limit:8}
        }).then(
            res=>commit('home',res.data.data)
        )
    }
}
export default actions