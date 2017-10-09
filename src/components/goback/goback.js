import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import back_btn from '../../assets/images/backimg_03.jpg'
import './goback.scss'

export class Back extends Component{

	goback(){
		browserHistory.goBack();
	}

	render(){
		return( 
			<a className="a_goback" onClick={() => {
				if(this.props.gobackFn == ""){
					this.goback()
				}else{
					this.props.gobackFn()
				}
			}}>
			    <img src={back_btn} />
			</a>
		)
	}
}

export const GoPrev = (Props) => (
	<div className="listtop">
	    <Back gobackFn = {Props.gobackFn || ""}/>
	    <div className="title">
            {Props.children}
        </div>
	</div>
)

export default GoPrev