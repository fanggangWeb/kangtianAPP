//获取应用实例
const app = getApp()
import { fetch } from '../../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '搜索结果', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,  // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  toSearch(e) {
    var value = e.detail.value
    console.log(value)
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
    // this.getList()
  },
  onReachBottom: function () {

  }
});
