import HttpFn from '../../core/http.js'
import { getCookie } from '../../core/cookie.js'
import { browserHistory } from 'react-router'

export const getCartCount = (has) => {
    return (dispatch, getState) => {
        let uid = getCookie("userId");
        if((!getState().shopcart.had || has) && !!uid){
	        return HttpFn({
	            _act: "/api/shopcart/count",
	            uid: uid
	        }).then(function(res){
	        	if(!!res.data){
					dispatch({
						type: "GETSHOPCARTNUM",
						num: res.data.count || 0,
						had: true
					})
	        	}else{
	        		return;
	        	}
	        })
        }else{
        	return
        }
    }
}
const init = {
	num: 0,
	had: false
}

export default (state = init , action) =>{
	if(action.type == "GETSHOPCARTNUM"){
		return {...state , num: action.num , had: action.had}
	}else{
		return state
	}
}
