import HttpFn from '../../core/http.js'

export const getFindInfo = () => {
    return function(dispatch, getState) {
        let state = getState();
        if(state.find.had){
            return
        }
        return HttpFn({
            _act: "/api/item/classlist"
        }).then(function(res) {
            dispatch({
                type: "HASGETFINDLIST",
                findInfo: res.data,
                had: true
            })
        })
    }
}


const initialState = {
    info: [],
    had: false
}

export default function findReducer(state = initialState, action) {
    if (action.type == "HASGETFINDLIST") {
        return ({...state, info: action.findInfo , had: action.had})
    } else {
        return state
    }
}
