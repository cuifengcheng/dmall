import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link , browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getFullCut } from '../../store/fullcut'
import "./shelf.scss"

export class shelf extends Component {
	constructor(props) {
	  super(props);
	  this.textFilter = this.textFilter.bind(this);
	  this.oldPrice = this.oldPrice.bind(this);
	}

	componentDidMount(){
		if(this.props.fullCutList == "" && browserHistory.getCurrentLocation().pathname != "/"){
			this.props.getFullCut()
		}
	}

	textFilter(){
		let isshow= this.props.showTitle;
		let hl;
		if(isshow){
			hl = (<div className="title"><span>{this.props.item.name}</span><p>{this.props.item.title}</p></div>)
		}else{
			hl = (<div className="topic_title">{this.props.item.name}</div>)
		}
		return hl;
	}

	oldPrice(){
		const {discount_rate , min_price ,discount_start , discount_end} = this.props.item;
		let oldPrice = parseFloat(min_price).toFixed(2);
		let discut = parseFloat(discount_rate);
		let nowPrice = oldPrice;
		if(discut > 0 ){
			nowPrice = (oldPrice * discut/100).toFixed(2);
		}
		let disstart = discount_start.replace(/-/g,"/");
		let disend = discount_end.replace(/-/g,"/");
		let start = new Date(disstart);
		let end = new Date(disend);
		let now = new Date();
		let hl ;
		if(discut > 0 && now >= start && now <= end){
			hl = (<span><span>￥{nowPrice}<i></i></span><span className="old">￥{oldPrice}<i></i></span></span>)
		}else{
			hl = (<span>￥{nowPrice}<i></i></span>)
		}
		return hl;
	}

	render(){
		const { item , count = 2 , fullCutList} = this.props;
		let fullcut;
		if(item.fullcut_id != 0){
			for (let i = 0 ; i < fullCutList.length ; i++){
				if(fullCutList[i].id == item.fullcut_id){
					let cut = fullCutList[i];
					let start = cut.time_start;
					let end = cut.time_end;
					let now = new Date();
					let startTime = new Date(start);
					let endTime = new Date(end);
					if(now >= startTime && now <= endTime){
						fullcut = cut;
					}
					break;
				}
			}
		}
		return (
			<div className="listCon" style={{width: count ? 100/count + "%" : "50%"}}>
			    <Link className="shelf-link" to={`/item/no=${item.id}`} >
		            <div className="img-container">
		                {item.pic_show && (<img src={item.pic_show} />)}
		                {item.fullcut_id != 0 && fullcut &&  (
		                	<div className="market_sign">
		                	    <img src={fullcut.show_pic} />
		                	</div>
		                )}
		            </div>
			        <div className="text-container">
				        {this.textFilter()}
				        <div className="price">
					        {this.oldPrice()}
				        </div>
			        </div>
			    </Link>
			</div>
		)
	}
}

const mapState = (state) =>({
	fullCutList: state.fullCutList.info,
})

const mapDispatch = {
	getFullCut
}
export default connect(mapState,mapDispatch)(shelf);
