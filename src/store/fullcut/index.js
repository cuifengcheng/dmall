import HttpFn from '../../core/http.js'
import { browserHistory } from 'react-router'

export const getFullCut = () => {
    return (dispatch, getState) => {
        if (!getState().fullCutList.had) {
            return HttpFn({
                _act: "/api/fullcut/list"
            }).then(function(res) {
                if (res.code == 0) {
                    dispatch({
                        type: "GETFULLCUTINFO",
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
    if (action.type == "GETFULLCUTINFO") {
        return {...state, info: action.info, had: action.had }
    } else {
        return state
    }
}
