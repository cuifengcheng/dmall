export default {
    path: 'no=:kindId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            let context = require('./component/context.js').default
            cb(null, context)
        })
    }
}
