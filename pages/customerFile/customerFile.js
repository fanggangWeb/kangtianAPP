//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
let userInfo
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
    userInfo = wx.getStorageSync("userInfo");
  },
  onReady: function() {
    
  },
  onShow: function() {
    this.getCoustomerList()
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
  detailGo (e) {
  },
  getCoustomerList () {
    let data = {
      userId: userInfo.id
    }
    fetch({
      url: "/document/customerList",
      method: "post",
      data
    }).then(res => {
      if (res.code == 1) {
        console.log(res)
      } else {
        wx.showModal({
          title: '错误',
          content: res.message,
        });
      }
    })
  }
});
  