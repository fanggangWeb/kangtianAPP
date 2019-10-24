//获取应用实例
const app = getApp()
import { fetch } from '../../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    consultantList: [
      { id: 1, name: "张三丰" },
      { id: 2, name: "李四" },
      { id: 3, name: "王五" }
    ],
    changeIndex: 0,
    substituteIndex: 0,
    receiveState: true,
    inputValue: "",
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '客户详情', //导航栏 中间的标题
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
  toReceive () {
    this.setData({
      receiveState: !this.data.receiveState
    })
  },
  handleChange (e) {
    this.setData({
      changeIndex: e.detail.value
    })
    let id = this.data.consultantList[this.data.changeIndex].id
    console.log(id)
  },
  substituteChange (e) {
    this.setData({
      substituteIndex: e.detail.value
    })
    let id = this.data.consultantList[this.data.substituteIndex].id
    console.log(id)
  },
  toInput (e) {
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  onReachBottom: function () {
  },
});
  