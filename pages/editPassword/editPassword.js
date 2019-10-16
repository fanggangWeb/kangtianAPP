//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    oldPassword: "",
    password: "",
    passwordAgain: "",
    errorMessage: "",
    // 导航栏组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '修改密码', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
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
  oldPassInput (e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },
  passInput (e) {
    this.setData({
      password: e.detail.value
    })
  },
  againPassInput (e) {
    this.setData({
      passwordAgain: e.detail.value
    })
  },
  // 确认加校验
  toConfirm () {
    this.setData({
      errorMessage: ""
    })
    if (!this.data.oldPassword) {
      this.setData({
        errorMessage: "请输入原密码"
      })
      return
    }
    if (!this.data.password) {
      this.setData({
        errorMessage: "请输入新密码"
      })
      return
    }
    if (!this.data.passwordAgain) {
      this.setData({
        errorMessage: "请再次输入新密码"
      })
      return
    }
    if ( this.data.password !== this.data.passwordAgain) {
      this.setData({
        errorMessage: "两次密码不一致"
      })
      return
    }
  },
});
  