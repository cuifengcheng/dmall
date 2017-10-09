import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import logo from '../../assets/images/dasic_logo.png'
import 'font-awesome/css/font-awesome.min.css'
import './searchBar.scss'


export class SearchForm extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	showIcon: true,
	  	name: ""
	  }
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSearch = this.handleSearch.bind(this);
	  this.showSearchIcon = this.showSearchIcon.bind(this);
	  this.hideSearchIcon = this.hideSearchIcon.bind(this);
	}

	componentWillReceiveProps(next){
		this.setState({
			name: next.name
		})
	}

	handleChange(e){
		this.setState({
			name: e.target.value
		})
	}

	handleSearch(e){
		e.preventDefault();
		let searchName = this.state.name;
		browserHistory.push(`/search/keyword=${searchName}`);
	}

	showSearchIcon(){
		this.setState({
			showIcon: true
		})
	}

	hideSearchIcon(){
		this.setState({
			showIcon: false
		})
	}

	render(){
		const {showIcon} = this.state;
		return (
		    <div className="search">
		        <div className="input-group">
		        <form action="" onSubmit={this.handleSearch}>
		            <input type="search" value={this.state.name} onChange={ this.handleChange } onFocus={ this.hideSearchIcon } onBlur={ this.showSearchIcon } className="form-control" placeholder="搜索" style={{textIndent: showIcon ? "45%": "1%"}}/>
		        </form>
		        <i className="fa fa-search" style={{display: showIcon ? "inline-block" : "none"}}></i>
		        </div>
		    </div>
		)
	}
}


class Bar extends Component {
	render(){
		return (
			<div className="row search-bar">
			    <div className="topBar">
			        <div className="logo" >
			            <i><img src={logo}/></i>
			        </div>
			        <div className="form-wraper">
				        <SearchForm name=""/>
			        </div>
			    </div>
			</div>
		)
	}
}

export default Bar;
