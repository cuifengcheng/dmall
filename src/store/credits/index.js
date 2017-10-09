import HttpFn from '../../core/http.js'
import { browserHistory } from 'react-router'

export const getCredits = () => {
    return (dispatch, getState) => {
        if (!getState().credits.had) {
            return HttpFn({
                _act: "/api/user/creditcoelist"
            }).then(function(res) {
                if (res.code == 0) {
                    dispatch({
                        type: "GETCREDITS",
                        info: res.data,
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
    info: "",
    had: false
}

export default (state = initState, action) => {
    if (action.type == "GETCREDITS") {
        return {...state, info: action.info, had: action.had }
    } else {
        return state
    }
}
