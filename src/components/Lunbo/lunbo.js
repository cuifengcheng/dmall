import React ,{ Component }from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { withRouter } from 'react-router'

class lunbo extends Component {

	shouldComponentUpdate(nextProps,nextState){
		return (nextProps.list.length && nextProps.list != this.props.list)  > 0
	}

	render(){
		const { list , showDot = true } = this.props;
		let settings = {
		     dots: showDot,
		     autoplay: true,
		     infinite: false,
		     speed: 500,
		     slidesToShow: 1,
		     slidesToScroll: 1
		   };
		
		return list.length > 0 ? (
				<Slider {...settings }>
					{list.map((item,i) =>{return (typeof item == "object") ? (<div key={item.key || i}><a href={item.link} ><img src={item.pic} alt=""/></a></div>):(<div key={item.key || i}><a ><img src={item} alt=""/></a></div>)})}
				</Slider>
		):(<div></div>)
	}
}

export default withRouter(lunbo)
