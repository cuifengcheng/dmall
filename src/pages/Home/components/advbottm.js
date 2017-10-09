import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

const advbottm = (Props) => (
	<div className="adv-bottom">
        {Props.list.map((item , index) =>(
	        <a key={index} href={item.link}>
		        <img src={item.pic} />
	        </a>
    	))}
    </div>
)

export default withRouter(advbottm)