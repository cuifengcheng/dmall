import HttpFn from '../../core/http.js'
import { getCookie } from '../../core/cookie.js'
import { browserHistory } from 'react-router'

export const getUserInfo = () => {
    return (dispatch, getState) => {
        let uid = getCookie("userId");
        if ((!getState().user.had) && !!uid) {
            return HttpFn({
                _act: "/api/user/info",
                uid: uid
            }).then(function(res) {
                if (res.code == 0) {
                    dispatch({
                        type: "GETUSERINFO",
                        userInfo: res.data,
                        had: true
                    })
                } else {
                    return;
                }
            })
        } else {
            return
        }
    }
}

const initState = {
	userInfo: "",
	had: false
}

export default (state = initState , action) =>{
	if(action.type == "GETUSERINFO"){
		return {...state , userInfo: action.userInfo , had: action.had}
	}else{
		return state
	}
}

