import HttpFn from '../../core/http.js'

export const getAttrListHandle = () => {
    return function(dispatch, getState) {
        if (!getState().item.had) {
            return HttpFn({
                _act: "/api/item/attrlist"
            }).then(function(res) {
                dispatch({
                    type: "HASGETATTRLIST",
                    attrList: res.data,
                    had: true
                })
            })
        } else {
            return false
        }
    }
}

const itemInitial = {
    attrList: {},
    had: false
}

export default function ItemReducer(state = itemInitial, action) {
    if (action.type == "HASGETATTRLIST") {
        return ({...state, attrList: action.attrList, had: action.had })
    } else {
        return state
    }
}
