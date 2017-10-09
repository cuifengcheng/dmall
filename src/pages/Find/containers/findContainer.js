import { connect } from 'react-redux'
import Find from '../components/index.js'
import { getHomeData } from '../../../store/home'
import { getFindInfo } from '../../../store/find'

const mapDispatchToProps = {
	getHomeData,
	getFindInfo
}

const mapStateToProps = (state) => ({
	styleInfo: state.home.homeInfo.styleInfo,
	kindInfo: state.find.info
})

export default connect(mapStateToProps, mapDispatchToProps)(Find)
