import CoreLayout from '../layouts/CoreLayout'
import Login from './Login'
import Home from './Home'
import FindRoute from './Find'
import KindDetail from './KindDetail'
import ItemRoute from './Goods/routers/item'
import GroupRoute from './Goods/routers/group'
import CrowdfundRoute from './Goods/routers/crowdfund'
import MarketRoute from './Marketing'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'
import Search from './Search'
import Brand from './Brands'
import OrderConfirm from './OrderConfirm'
import AddressAdmin from './Address'
import AddressOpt from './AddressOpt'
import ShopCart from './Shopcart'
import Orderpay from './Orderpay'
import Journal from './Journal'
import Special from './Special'
import PaySuccess from './PaySuccess'
import Article from './Article'


import UserRoute from './User/MyUser' //我的页面
import OrderListRoute from './User/OrderList' //订单列表
import OrderInfoRoute from './User/OrderInfo' //订单详情
import CouponRoute from './User/Coupon' //优惠券页面
import MyCrowdfundRoute from './User/MyCrowdfund' //我的众筹页面
import MyGroupRoute from './User/GroupList' // 我的拼团
import SignIn from './User/SignIn' //登录页面
import ModifyRoute from './User/Modify' //账户管理页面
import MemberinfoRoute from './User/Memberinfo' //会员俱乐部页面
import CouponShareRoute from './User/CouponShare' //分享优惠券页面
import OrderreBackRoute from './User/Orderreback' //申请退款页面
import OrderrefundinfoRoute from './User/Orders/routers/orderrefundinfo' //维权详情页面
import OrderlogisticsinfoRoute from './User/Orders/routers/orderlogisticsinfo' //物流详情页面
import ShareactivityRoute from './User/ShareActivity' //领取优惠券活动页面
import OrderrefundRoute from './User/Orderrefund' //退货换货页面
import ActivityokRoute from './User/Activityok' //领取优惠券成功
import ShareCouponauthRoute from './User/ShareCouponauth' //分享后登录领取优惠券页面
import CouponokRoute from './User/Couponok' //领取优惠券成功之后页面


export const createRoutes = (store) => ([{
    path: '/',
    component: CoreLayout,
    indexRoute: Home(store),
    childRoutes: [
        ShopCart(store),
        FindRoute(store),
        KindDetail(store),
        Login(store),
        ItemRoute(store),
        GroupRoute(store),
        CrowdfundRoute(store),
        PageNotFound(),
        Brand(),
        Search(store),
        OrderConfirm(store),
        AddressAdmin(store),
        AddressOpt(store),
        Orderpay(store),
        Journal(store),
        Special(store),
        PaySuccess(store),
        MarketRoute(store),
        Article(store),

        UserRoute(), //我的页面
        OrderListRoute(store), //订单列表页面
        SignIn(store), //登录页面
        CouponRoute(), //优惠券页面
        OrderInfoRoute(), //订单详情
        MyCrowdfundRoute(), //我的众筹页面
        MyGroupRoute(), //我的拼团页面
        ModifyRoute(store), //账户管理页面
        MemberinfoRoute(), //会员俱乐部页面
        CouponShareRoute(), //分享优惠券页面
        OrderreBackRoute(), //申请退款页面
        OrderrefundinfoRoute(), //维权详情页面
        OrderlogisticsinfoRoute(), //物流详情页面
        OrderrefundRoute(store), //退货换货页面
        ShareactivityRoute(), //领取优惠券活动页面
        ActivityokRoute(), //优惠券领取成功页面
        ShareCouponauthRoute(), //分享后登录领取优惠券页面
        CouponokRoute(), //领取优惠券成功页面
        Redirect
    ]
}])

export default createRoutes
