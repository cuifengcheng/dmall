import React,{Component}from 'react'
import PropTypes from 'prop-types'
import Nav from "./nav.js"
import Footer from '../../../components/Footer'
import HttpFn from '../../../core/http.js'
import isEmpty from '../../../core/isemptyobj.js'
import './index.scss'

export class Find extends Component {
	componentWillMount(){
		const { styleInfo, kindInfo , getFindInfo , getHomeData} = this.props;
		if(styleInfo.length == 0){
			getHomeData();
		}
		if(kindInfo.length == 0){
			getFindInfo();
		}
	}

	render(){
		const { styleInfo = {} , kindInfo = [] ,children} = this.props;
		return (
			<div className="find-container">
				<Nav />
				{children && React.cloneElement(children, {kind: kindInfo, style: styleInfo})}
				<Footer />
			</div>
		)
	}
}
    
    

export default Find;
