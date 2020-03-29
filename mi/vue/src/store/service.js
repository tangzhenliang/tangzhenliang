import axios from '../plugins/axios'

function get({apiname,params,_id=null}){
    if(!apiname){
        console.log('apiname,type,commit 为比传参数')
        return;
    }
    let url = _id? '/api/goods/' +apiname + '/'+_id : 'api/goods/' + apiname;
    params = params || {_page:1,_limit:3}
    return axios({
        url,params
    }).then(
        res=>res.data.data
    )
}

export {get}