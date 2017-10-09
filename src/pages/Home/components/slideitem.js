import React ,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class slideitem extends Component {
	render(){
		let screenWidth = document.body.clientWidth;
		let width = screenWidth * 0.267 ;
		let height = width * 1.25;
		const { list , fullCutList} = this.props;
		let fullcut = {};
		for (let i = 0 ; i < fullCutList.length ; i++){
			let cut = fullCutList[i];
			let start = cut.time_start;
			let end = cut.time_end;
			let now = new Date();
			let startTime = new Date(start);
			let endTime = new Date(end);
			if(now >= startTime && now <= endTime){
				fullcut[cut.id] = cut;
			}
			break;
		}

		return (
			<div className="slide-container">
				{list.map((item) =>(
					<div className="slide-item" key={item.key}>
						<a href={item.link}>
							<img src={item.pic}/>
						</a>
						<div className="smallBanner" >
							<div className="imgCon" style={{width: (width + 14) * (item.goods.length) + "px"}}>
								{item.goods.map((gd) => (
									<Link to= {`/item/no=${gd.id}`} className="item" style={{width: width + "px"}} key={gd.id}>
										<div className="dd" >
											<img src={gd.pic_show} className="lazy" style={{height: height + "px"}}/>
											{fullcut[gd.fullcut_id] && (
												<div className="market_sign_small">
												    <img src={fullcut[gd.fullcut_id].show_pic} />
												</div>
											)}
										</div>
										<p>{gd.name}</p>
										<div className="price"> <span>￥{gd.min_price}</span></div>
									</Link>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}
}
const mapState = (state) =>({
	fullCutList: state.fullCutList.info,
})

export default connect(mapState,{})(slideitem)
