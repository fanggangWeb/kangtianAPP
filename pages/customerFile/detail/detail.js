//获取应用实例
const app = getApp()
import { fetch, imageURL } from '../../../utils/fetch'
const SUCCESS_OK = '200'
let ID,userInfo
//Page Object
Page({
  data: {
    inputValue: "",
    detailInfo: {},
    documentList: [],
    imageURL: imageURL,
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '客户详情', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    ID = options.id
    userInfo = wx.getStorageSync("userInfo");
  },
  onReady: function() {
    
  },
  onShow: function() {
    this.getInfo()
    this.getDocumentList()
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  goEdit () {
    wx.navigateTo({
      url: "../edit/edit?id="+ID
    })
  },
  toInput (e) {
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  getInfo () {
    let data = {
      id: ID
    }
    fetch({
      url: "/common/getVisitorMore",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        // console.log(res)
        this.setData({
          detailInfo: res.data
        })
      } else {
        wx.showModal({
          title: "错误",
          content: res.message
        })
      }
    })
  },
  // 获取客户档案列表
  getDocumentList () {
    let data = {
      id: ID,
      start: 0,
      num: 9999
    }
    fetch({
      url: "/document/documentList",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          documentList: res.data
        })
      } else {
        wx.showModal({
          title: "错误",
          content: res.message
        })
      }
    })
  },
  // 保存客户
  saveDocument () {
    if (!this.data.inputValue) {
      wx.showModal({
        title: "提示",
        content: "请输入内容"
      })
      return false
    }
    let data = {
      sysUserId: userInfo.id,
      userId: ID,
      context: this.data.inputValue
    }
    fetch({
      url: "/document/addDocument",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        wx.showModal({
          title: "提示",
          content: "新增成功！"
        })
        wx.setData({
          inputValue: ""
        })
        this.getDocumentList()
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
  },
  onReachBottom: function () {
  },
});
  