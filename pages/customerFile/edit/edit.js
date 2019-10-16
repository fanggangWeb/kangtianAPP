//获取应用实例
const app = getApp()
import { fetch } from '../../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    inputValue: "",
    detailInfo: {
      name: "王力宏",
      phone: "1329719977",
      level: "VIP1",
      career: "经营公司",
      position: "职员",
      consultant: "张三丰"
    },
    vipList: [
      {id:1, name:"vip1"},
      {id:2, name:"vip2"},
      {id:3, name:"vip3"},
      {id:4, name:"vip4"},
      {id:5, name:"vip5"},
      {id:6, name:"vip6"},
      {id:7, name:"vip7"},
      {id:8, name:"vip8"},
      {id:9, name:"vip9"},
    ],
    vipIndex: 0,
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '编辑', //导航栏 中间的标题
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
  nameChange(e) {
    console.log(e.detail.name)
  },
  levelChange (e) {
    console.log(e)
    this.setData({
      vipIndex: parseInt(e.detail.value)
    })
  },
  changeAvatar () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // uploadFetch({
        //   filePath: tempFilePaths[0]
        // }).then(res => {
        //   that.setData({
        //     positiveUrl: res.data,
        //     positiveShow: false
        //   })
        // })
      }
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
  