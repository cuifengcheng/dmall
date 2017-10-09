import React from 'react'
import { withRouter } from 'react-router'

export const advpos = (props) => (
	<div className="advpos">
		{props.list.map((item) => (
			<a href={item.link} key={item.key}><img src={item.pic} /></a>
		))}
	</div>
)

export default withRouter(advpos)
