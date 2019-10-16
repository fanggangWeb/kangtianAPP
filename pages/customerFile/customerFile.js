//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const { $Toast } = require('../../dist/base/index.js');
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    searchValue: "",
    customerList: [1,2,3,4,5,5,5,5,5,5,5,5,5],
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '客户档案', //导航栏 中间的标题
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
  toSearch (e) {
    var value = e.detail.value
    this.setData({
      searchValue: value
    })
    // console.log(value)
  },
  detailGo () {
    // $Toast({
    //   content: '成功的提示',
    //   type: 'success'
    // });
    // wx.showToast({
    //   title: "成功提示",
    //   icon: 'success',
    //   image: '',
    //   duration: 2500,
    // });
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
    // this.getList()
  },
  onReachBottom: function () {
    console.log(1111)
    // this.setData({
    //   page: this.data.page + 1 
    // })
    // this.getMoreList()
  },
});
  