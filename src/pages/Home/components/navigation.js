import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const navigation = (Props) => (
	<div className="navig-container">
		{Props.list.map((item) => (
			<div className="imgCon" key={item.key} style= {{ width: 100 / Props.count + "%"}}>
        <a href={item.link}><img className="nolazy" src={item.pic} /></a>
			</div>
		))}
		<div className="clear"></div>
	</div>
)

export default withRouter(navigation)
