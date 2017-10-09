import { combineReducers } from 'redux'
import locationReducer from './location'
import homeReducer from './home'
import findReducer from './find'
import shopcartReducer from './shopcart'
import itemAttrReducer from './item'
import userInfoReducer from './user'
import creditsReducer from './credits'
import fullcutReducer from './fullcut'

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        home: homeReducer,
        find: findReducer,
        shopcart: shopcartReducer,
        item: itemAttrReducer,
        user: userInfoReducer,
        credits: creditsReducer,
        fullCutList: fullcutReducer,
        ...asyncReducers
    })
}

export const injectReducer = (store, { key, reducer }) => {
    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
