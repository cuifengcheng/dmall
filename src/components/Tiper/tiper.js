import React from "react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./tiper.scss"

export default ({showMsg}) =>(
		<ReactCSSTransitionGroup
		  transitionName="prompt"
		  component="div"
		  transitionEnterTimeout={300}
		  transitionLeaveTimeout={300}>
		  {showMsg && (<div className="prompt">{showMsg}</div>)}
		</ReactCSSTransitionGroup>
	)
