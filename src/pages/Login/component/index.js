import React , { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Goback from '../../../components/goback'
import HttpFn from '../../../core/http.js'
import { setCookie } from '../../../core/cookie.js'
import { getUserInfo } from '../../../store/user/index.js'
import './index.scss'


class Login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 telNum: "",
	  	 showMsg: "",
	  	 seconds: "发送验证码",
	  	 verify: ""
	  };
	  this.telChangeHandle = this.telChangeHandle.bind(this)
	  this.telBlur = this.telBlur.bind(this)
	  this.verifyHandle = this.verifyHandle.bind(this)
	  this.sendVerify = this.sendVerify.bind(this)
      this.loginHandle = this.loginHandle.bind(this)
	}

	telChangeHandle(e){
		let telNum = e.target.value;
		this.setState({
			telNum: telNum
		})
	}
	telBlur(e){
		let telNum = e.target.value;
		if(!(/^1[34578]\d{9}$/.test(telNum))){ 
			this.setState({
				showMsg: "手机格式不正确，请重新输入"
			})
	    }
	}
    verifyHandle(e){
		this.setState({
			verify: e.target.value
		})
    }

    sendVerify(){
		let tel = this.state.telNum , self = this;
		if(/^1[34578]\d{9}$/.test(tel)){
			HttpFn({
				_act:"/api/user/vcode",
				_method: "POST",
				mobile: tel
			}).then(function(res){
				if(res.code == "0"){
					let num = 60;
					self.setState({
						seconds: `重新发送（${num}）`
					})
					self.interval = setInterval(()=>{
						num -= 1
						if( num == 0){
							self.setState({
								seconds: "发送验证码"
							});
							clearInterval(self.interval)
						}else{
							self.setState({
								seconds: `重新发送（${num}）`
							})
						}
					},1000)
				}
			})
		}
    }

    loginHandle(){
		const { telNum , verify } = this.state
		let self = this;
		if(!telNum){
			this.setState({
				showMsg: "请输入手机号"
			})
			return;
		}
		if(!verify){
			this.setState({
				showMsg: "请输入验证码"
			})
			return;
		}
		HttpFn({
			_act:"/api/user/login",
			_method: "POST",
			mobile: telNum,
			vcode: verify,
			channel: "1"
		}).then(function(res){
			if(res.code == "1"){
				self.setState({
					showMsg: res.msg
				})
				return;
			}
			if(res.code == "0"){
				setCookie("userId",res.data.uid,15);
				self.props.getUserInfo();
				browserHistory.goBack()
			}
		})
    }

    componentWillUnmount(){
		this.interval && clearInterval(this.interval)
    }

	gobackFn(){
		window.history.go(-1);
	}

	render(){
		const { router } = this.props
		const { telNum , showMsg , seconds ,verify} = this.state
		return(
			<div className="page-login">
				<Goback router={router} gobackFn={this.gobackFn}>
					<span>登录</span>
				</Goback>
				<div className="loginMain">
				    <span>手机号</span>
				    <div className="tel">
				        <span>+86</span>
				        <input type="number" value={telNum} onChange={this.telChangeHandle} onBlur={this.telBlur} maxLength="11" placeholder="请输入您的手机号"  className="telphone" />
				    </div>
				    <div className="clear"></div>
				    <div className="setData">
				        <input type="text" value={verify} onChange={this.verifyHandle} placeholder="验证码 6位数字" className="setYZ" />
				        {seconds != "发送验证码" ? (<input type='button' className="set" value={seconds}/>) : (<input type='button' className="set" value={seconds} onClick={this.sendVerify}/>)}
				    </div>
				</div>
				<div className="clear"></div>
				<div className="info_button" onClick={this.loginHandle}>
				    <a>登录</a>
				</div>
				<div className="set_yz_mesg" style={{display: showMsg ? "block": "none"}}>{showMsg}</div>
			</div>
		)
	}
}

const mapDispatchToProps = {
	getUserInfo
}
const mapStateToPorps = () =>({

})

export default connect(mapStateToPorps,mapDispatchToProps)(Login)