export default (store) => ({
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const home = require("./container/home.js").default;
            cb(null, home)
        }, "home")
    }
})
