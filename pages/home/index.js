//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    background: [{url: '../../assets/images/banner.png'}, {url: '../../assets/images/banner.png'}],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3500,
    duration: 300,
    current: 0
  },
  onLoad: function(options) {
    var that = this
  },
  onReady: function() {
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  switchChange (e) {
    this.setData({
      current: e.detail.current
    })
  },
  handleClick () {
    wx.showModal({
      content: this.data.current.toString(),
    });
      
  },
  getPhoneNumber: function(e) {
    console.log(e)
    if (e.detail.errMsg =="getPhoneNumber:ok") { // 允许获取手机号
      let iv = e.detail.iv
      let encryptedData = e.detail.encryptedData
      let sessionKey = wx.getStorageSync('sessionKey')
      let data = {
        encrypted: encryptedData,
        iv: iv,
        sessionKey: sessionKey
      }
    } else { // 不允许获取手机号
    }
  },
  onTabItemTap:function(item) {

  },
  // onPullDownRefresh: function () {
  //   setTimeout(() => {
  //     wx.stopPullDownRefresh()
  //   }, 1000)
  // },
});