import React , { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { SearchForm } from '../../../components/SearchBar/searchbar.js'
class Nav extends Component {
	constructor(props) {
	  super(props);
	  this.onSearch = this.onSearch.bind(this)
	  this.cancelSearch = this.cancelSearch.bind(this)
	  this.state = {
	  	search: false
	  }
	}
	componentDidMount(){
		if(this.props.kindInfo.length > 0){
			this.setState({
				kindUrl: `/find/kind/no=${this.props.kindInfo[0].id}`
			})
		}
	}
	componentWillReceiveProps(next){
		if(next.kindInfo.length > 0){
			this.setState({
				kindUrl: `/find/kind/no=${next.kindInfo[0].id}`
			})
		}
	}
	onSearch(){
		this.setState({
			search: true
		})
	}
	cancelSearch(){
		this.setState({
			search: false
		})
	}

	render(){
		const {search , kindUrl = ""} = this.state;
		return (
			<div className="find_new_top">
			    <div className="find_new_seach_icon" onClick={this.onSearch}>
			        <i className="fa fa-search"></i>
			    </div>
			    <div className="nav-container">
		    	    <div className="search-bar" style={{width: search ? "50%" : "0"}}>
		    	        <div className="search-box">
		    	            <SearchForm name=""/>
		    	        </div>
		    	        <div className="cancel-btn" onClick={this.cancelSearch}>
		    	            <span>取消</span>
		    	        </div>
		    	    </div>
		    	    <div className="find-nav">
		    	    	<Link to={ kindUrl } className="nav-left" activeClassName="nav-active">
			    	    	<span >分类推荐</span>
		    	    	</Link>
		    	    	<Link to="/find/style" className="nav-right" activeClassName="nav-active">
			    	    	<span >搭配风格</span>
		    	    	</Link>
		    	    </div>
		    	    <div className="clear"></div>
			    </div>
			</div>
		)
	}
}

const mapState = (state) =>({
	kindInfo: state.find.info
})

export default connect(mapState)(Nav)