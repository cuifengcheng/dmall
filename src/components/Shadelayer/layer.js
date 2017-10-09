import React , { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-router'
import './layer.scss'


class Layer extends Component {
	render(){
		const { show = false , onClick ,style = {}} = this.props;
		return (
			<ReactCSSTransitionGroup
		      transitionName="layer"
		      component="div"
		      transitionEnterTimeout={300}
		      transitionLeaveTimeout={300}>
		      {show && (<div className="layer"  onClick={onClick} style={{...style }}>
		      </div>)}
		    </ReactCSSTransitionGroup>
		)
	}
}

export default Layer