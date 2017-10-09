import React, { Component }from 'react'
import { Link } from 'react-router'

class Context extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	item: {}
	  };
	}

	componentWillReceiveProps(next){
		this.setStateHandle.call(this, next)
	}

	componentWillMount(){
		this.setStateHandle.call(this,this.props)
	}

	setStateHandle(Props){
		const {params , list } = Props
		let kindId = params.kindId;
		let item = {}
		for(let i = 0 ; i < list.length ; i++){
			if(list[i].id == kindId){
				item = list[i]
			}
		}
		this.setState({
			item: item 
		})	
	}

	render(){
		const { pic_link = "" , tags_list = [] , pic = "" } = this.state.item;
		let kindId = this.props.params.kindId;

		return (
			<div className="find-right">
				<div className="pic-show">
				    <a href={pic_link}><img src={pic}/></a>
				</div>
				<div className="pic-item">
					<Link to={`/kindDetail/class=${kindId}/tag=0`}>
					    <div className="category">
					        <div className="find_new_category">ALL</div>
					        <div className="title"><span>全部</span></div>
					    </div>
					</Link>
					{tags_list.map((it) => (
						<Link to={`/kindDetail/class=${kindId}/tag=${it.id}`}  key={it.id} >
						    <div className="category">
						        <div className="find_new_category">
						        	<img src={it.pic} />
						        </div>
						        <div className="title"><span>{it.name}</span></div>
						    </div>
					    </Link>
					))}
				</div>
			</div>
		)
	}
}


export default Context

