import React, { Component }from 'react'
import { Link } from 'react-router'
import $ from "jquery"
class kind extends Component {
	render(){
		const { kind = [] } = this.props;
		const height = (document.body.clientHeight- 100)/6 + "px"
		return (
			<div className="find-context">
				<div className="find-left">
					{kind.map((item) => (
						<Link to= {`/find/kind/no=${item.id}`} key={item.id}  activeClassName="kind-active" className="kind" >
							<div className="kind-box" style={{height: height}}>
								<span>{item.name}</span><div className="triangle"></div>
							</div>
						</Link>
					))}
				</div>
				{this.props.children && React.cloneElement(this.props.children , {list: kind})}
			</div>
		)
	}
}

export default kind
