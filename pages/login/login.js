//获取应用实例
const app = getApp()
import { fetch, apiUrl } from '../../utils/fetch'
//Page Object
Page({
  data: {
    errorMessage: "",
    account: "",
    password: "",
    // 组件所需的参数
    navbarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '康田置业售楼部', //导航栏 中间的标题
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
  toLogin () {
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
    let data = {
      username: this.data.account,
      password: this.data.password
    }
    fetch({
      url: "/common/login",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        wx.setStorageSync("userInfo", res.data)
        wx.switchTab({
          url: '../home/index'
        });
      } else {
        wx.showModal({
          title: '错误',
          content: res.data.message,
        });
      }
    })
  }
});
  