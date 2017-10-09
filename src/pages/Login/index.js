import injectReducer from '../../store/reducers.js'

export default (store) => ({
	path: "login",
	getComponent(nextState , cb){
		require.ensure([] , (require)=>{
			const login = require('./component').default;
			cb(null,login);
		},'login')
	}
})