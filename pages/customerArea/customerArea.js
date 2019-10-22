//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
let userInfo
//Page Object
Page({
  data: {
    customerList: [1,2,3,4,5,5,5,5,5,5,5,5,5],
    noDataState: false,
    tabList: [
      {name: "全部", id: 1},
      {name: "个人", id: 0},
      {name: "待办事项", id: 2}
    ],
    tabValue: 1,
    page: 0,
    size: 9999,
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '客户区', //导航栏 中间的标题
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
    this.getList()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  // toSearch (e) {
  //   var value = e.detail.value
  //   console.log(value)
  // },
  changeTab (e) {
    // console.log(e.currentTarget.dataset.item)
    var item = e.currentTarget.dataset.item
    this.setData({
      tabValue: item.id
    })
    this.getList()
  },
  getList () {
    let data = {
      propertyConsultantId: userInfo.id,
      type: this.data.tabValue,
      flag: 0, // (0:工作间, 1:洽谈室)
      salesAgencyId: userInfo.companyId,
      startPosition: this.data.page,
      maxLength: this.data.size
    }
    fetch({
      url: "/adviser/getWaitCustomerInfo",
      method: "post",
      data
    }).then(res => {
      if (res.code == 1) {
        if (res.data&&res.data.length>0) {

        } else {
          this.setData({
            noDataState: true
          })
        }
      } else {
        wx.showModal({
          title: "错误",
          content: res.message
        })
      }
    })
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
    this.getList()
  },
  // onReachBottom: function () {
  //   console.log(1111)
  // },
});
  