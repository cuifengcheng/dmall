import React ,{ Component } from 'react'
import ListItem from '../../../../Home/components/listitem.js'

class Style extends Component{
	render(){
		const { list = [] , show = true } = this.props.style
		return (
			show ? (<ListItem list={ list } />) : (<div></div>)
		)
	}
}


export default Style