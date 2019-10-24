//获取应用实例
const app = getApp()
import { fetch,imageURL } from '../../utils/fetch';
const SUCCESS_OK = '200'
//Page Object
Page({
  data: {
    counselorList: [],
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '置业顾问', //导航栏 中间的标题
    },
    height: app.globalData.statusBarHeight+app.globalData.headerHeight, // 此页面 页面内容距最顶部的距离
	imageUrl:imageURL
  },
  //options(Object)
  onLoad: function(options) {
    this.getAdviserList();
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },

  // 点击顾问
  detailGo (e) {
	let index = e.currentTarget.dataset.index;
	wx.setStorageSync('counselorObj',this.data.counselorList[index]);
	wx.navigateTo({
		url:'/pages/counselorList/searchResult/index'
	})
	
  },
  // 获取置业顾问
  getAdviserList(){
  	let data = {
  		companyId:wx.getStorageSync("userInfo").companyId
  	}
  	fetch({
  		url: "/manage/getAdviserList",
  		method: "post",
  		data: data
  	}).then(res => {
  		if (res.code == 1) {
  			this.setData({
  				counselorList: res.data
  			})
  		} else {
  			wx.showModal({
  				title: '错误',
  				content: res.message,
  				showCancel:false
  			});
  		}
  	})
  },
});
  