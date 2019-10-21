//获取应用实例
const app = getApp()
import { fetch,imageURL } from '../../../utils/fetch'
//Page Object
Page({
  data: {
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '顾问详情', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,  // 此页面 页面内容距最顶部的距离
	visitorList:[],//成员列表
	counselorObj:{},//顾问信息
  },
  //options(Object)
  onLoad: function (options) {
	this.setData({
		counselorObj:wx.getStorageSync('counselorObj')
	})
	this.getData();
		
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {
	wx.removeStorageSync('counselorObj');
  },
  toSearch(e) {
    var value = e.detail.value
    console.log(value)
  },
  onReachBottom: function () {

  },
  // 根据顾问获取客户列表
  getData(){
	  let data = {
	  	companyId:wx.getStorageSync("userInfo").companyId,
		start:1,
		num:1000,
		flag:0,
		userId:this.data.counselorObj.propertyConsultantId
	  }
	  fetch({
	  	url: "/document/customerList",
	  	method: "post",
	  	data: data
	  }).then(res => {
	  	if (res.code == 1) {
			console.log(res)
	  		// 获取在线的
	  		res.data.forEach((v, i) => {
	  			v.visitorImg = imageURL + v.visitorImg;
	  		})
	  		this.setData({
	  			visitorList: res.data
	  		})
	  	} else {
	  		wx.showModal({
	  			title: '错误',
	  			content: res.data,
	  			showCancel:false
	  		});
	  	}
	  })
  }
});
