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
    accountList: [
      { url: "../../assets/images/text.jpg", name: "张三丰"}
    ],
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示  0表示不显示
      title: '切换账号', //导航栏 中间的标题
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
  chooseAccount (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    console.log(item)
    wx.showModal({
      title: '提示',
      content: '确认要切换账号吗？',
      success (res) {
        if (res.confirm) {
  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addAccount () {
    wx.navigateTo({
      url: '../addAccount/addAccount',
    });
      
  }
});
  