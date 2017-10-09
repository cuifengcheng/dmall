import React , { Component }from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { getFindInfo } from '../../store/find'
import { getCartCount } from '../../store/shopcart'
import './Footer.scss'

class Footer extends Component {
	constructor(props) {
	  super(props);
	  this.state = {};
	}

	componentDidMount(){
		this.props.getFindInfo()
		this.props.getCartCount()
		if(this.props.kindInfo.length > 0 ){
 			this.setState({
 				findUrl: `/find/kind/no=${this.props.kindInfo[0].id}`
 			})
		}
	}
	
	componentWillReceiveProps(next){
		const { kindInfo } = next
		if(kindInfo.length > 0 ){
 			this.setState({
 				findUrl: `/find/kind/no=${kindInfo[0].id}`
 			})
		}
	}

	render(){
		const { findUrl = ""} = this.state
		const { shopcartnum } = this.props
		return (
			<div className="footer-component">
				<ul>
				    <li><IndexLink to="/" activeClassName="active-link" className="link"><i className="choice"></i><div className="footer-color">精选</div></IndexLink></li>
				    <li><Link to={ findUrl } activeClassName="active-link" className="link"><i className="find"></i><div className="footer-color">发现</div></Link></li>
				    <li>{(!!shopcartnum) && (<span className="shopcart-num">{shopcartnum}</span>)}<Link to="/user/shopcart" activeClassName="active-link" className="link"><i className="shopCart"></i><div className="footer-color">购物袋</div></Link></li>
				    <li><Link to="/mine" activeClassName="active-link" className="link"><i className="my"></i><div className="footer-color">我的</div></Link></li>
				</ul>
			</div>
		)
	}
}
const mapDispatchToProps = {
	getFindInfo,
	getCartCount
}

const mapStateToProps = (state) => ({
	kindInfo: state.find.info,
	shopcartnum: state.shopcart.num
})

export default connect(mapStateToProps,mapDispatchToProps)(Footer);
