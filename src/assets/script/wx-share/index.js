import wx from 'weixin-js-sdk'
import sha1 from 'js-sha1'
import httpFn from '../../../core/http.js'

//生成随机字符串方法
const randomString = (len) => {
  len = len || 32;
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

//生产时间戳
const timestamp = () => {
  const timestamp=new Date().getTime()
  return timestamp
}

const getUrl = () => {
  const allUrl = window.location.href.split('/')
  const url = `${allUrl[0]}//${allUrl[2]}`
  return url
}

//微信分享设置
const share_set = (signature,data) => {
  wx.config({
    debug: false,
    appId: 'wx7df34084528c2fa2',
    timestamp:timestamp(),
    nonceStr: randomString(16),
    signature: signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
  })
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: data.title,
      link: getUrl() + data.link, // 分享链接
      imgUrl: data.imgUrl, // 分享图标
      success: function () {},
      cancel: function () {}
    });
    wx.onMenuShareAppMessage({
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: getUrl() + data.link, // 分享链接
      imgUrl:data.imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {},
      cancel: function () {}
    });
  });
}

//得到ticket签名
const wx_share = (data) => {
  httpFn({_method:'GET', _act: '/api/tools/wxshare'})
    .then(res => {
      if (res.code === 0) {
        const ticket = res.data.ticket
        const jsapi_ticket = `${ticket}&noncestr=${randomString(16)}&timestamp=${timestamp()}`
        const signature = sha1(jsapi_ticket)
        share_set(signature, data)
      }
    })
}

export default wx_share
