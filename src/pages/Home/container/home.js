import { connect } from 'react-redux'
import Home from '../components/index.js'
import { getHomeData } from '../../../store/home'
const mapStateToProps = (state) => ({
	homeInfo: state.home.homeInfo
})

const mapDispatchToProps = {
	getHomeData
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
