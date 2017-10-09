import Kind from './routes/kind'
import Style from './routes/style'

export default (store) => {
    return {
        path: "find",
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                const find = require("./containers/findContainer.js").default
                cb(null, find)
            }, "findIndex")
        },
        childRoutes: [Kind, Style]
    }
}
