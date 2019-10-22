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
    errorMessage: "",
    // 详细信息
    visitorImg: "",
    visitorNm: "",
    visitorPhone: "",
    job: "",
    post: "",

    imageURL: imageURL,
    vipList: [
      {id:1, name:"vip1"},
      {id:2, name:"vip2"},
      {id:3, name:"vip3"},
      {id:4, name:"vip4"},
      {id:5, name:"vip5"},
    ],
    consultantList: [
      {id: 1, name: "张三丰"},
      {id: 2, name: "李四"}
    ],
    vipIndex: 0,
    consultantIndex: 0,
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '编辑', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20  // 此页面 页面内容距最顶部的距离
  },
  //options(Object)
  onLoad: function(options) {
    ID = options.id
    userInfo = wx.getStorageSync("userInfo");
  },
  onReady: function () {
    
  },
  onShow: function () {
    this.getInfo()
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  nameChange(e) {
    this.setData({
      visitorNm: e.detail.value
    })
  },
  phoneChange (e) {
    this.setData({
      visitorPhone: e.detail.value
    })
  },
  jobChange (e) {
    this.setData({
      job: e.detail.value
    })
  },
  postChange (e) {
    this.setData({
      post: e.detail.value
    })
  },
  saveInfo () {
    this.setData({
      errorMessage: ""
    })
    if (!this.data.visitorNm) {
      this.setData({
        errorMessage: "请输入姓名"
      })
      return false
    }
    if (!this.data.visitorPhone) {
      this.setData({
        errorMessage: "请输入联系电话"
      })
      return false
    }
    let data = {
      userId: ID,
      visitorNm: this.data.visitorNm,
      visitorPhone: this.data.visitorPhone,
      job: this.data.job,
      post: this.data.post
    }
    fetch({
      url: "/document/editCustomer",
      method: "post",
      data: data
    }).then(res => {
      if (res.code == 1) {
        wx.showModal({
          title:"提示",
          content: "修改成功"
        })
        this.getInfo()
      } else {
        wx.showModal({
          title: "错误",
          content: res.message
        })
      }
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
          visitorImg: res.data.visitorImg,
          visitorNm: res.data.visitorNm,
          visitorPhone: res.data.visitorPhone,
          job: res.data.job,
          post: res.data.post
        })
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
  