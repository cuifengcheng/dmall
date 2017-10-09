import Kind from './component/sideBar.js'

export default {
    path: 'kind',
    getChildRoutes(partialNextState, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/index.js').default
            ])
        })
    },
    component: Kind
}
