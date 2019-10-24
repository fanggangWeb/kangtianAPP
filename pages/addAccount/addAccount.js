//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    errorMessage: "",
    account: "",
    password: "",
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示  0表示不显示
      title: '添加账号', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  accountInput (e) {
    // console.log(e.detail.value)
    this.setData({
      account: e.detail.value
    })
  },
  passInput (e) {
    this.setData({
      password: e.detail.value
    })
  },
  toAdd () {
    this.setData({
      errorMessage: ""
    })
    if (this.data.account == "") {
      this.setData({
        errorMessage: "请输入账号"
      })
      return
    }
    if (this.data.password == "") {
      this.setData({
        errorMessage: "请输入密码"
      })
      return
    }

  }
});
  