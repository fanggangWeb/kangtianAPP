//获取应用实例
const app = getApp()
import { fetch } from '../../utils/fetch'
const SUCCESS_OK = '200'
//Page Object
Page({
	data: {
		// 组件所需的参数
		navbarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '客户浏览', //导航栏 中间的标题
		},
		height: app.globalData.height * 2 + 20, // 此页面 页面内容距最顶部的距离
		search: '',
		visitorList: [], //成员列表
		counselorList: [{
			id: 0,
			name: '某1'
		}, {
			id: 1,
			name: '某2'
		}, {
			id: 2,
			name: '某3'
		}], //职业顾问
		componentText: {
			title: '小组成员',
			buttonText: '确定拆分',
			type:1//type 1 为拆分 2为关联
		}, //组件名字
		showModal: false, //是否显示模太框
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
	toSearch(e) {
		var value = e.detail.value
		console.log(value)
	},
	onPullDownRefresh: function() {
		setTimeout(() => {
			wx.stopPullDownRefresh()
		}, 1000)
		// this.getList()
	},
	onReachBottom: function() {

	},
	// 获取搜索文字
	getSearchText(e) {
		this.setData({
			search: e.detail.value
		})
	},
	// 模态框点击确认
	modalSubmit(e) {
		console.log(e)
		this.setData({
			showModal: false
		})
	},
	// 关闭模态框
	closeModal(){
		this.setData({
			showModal: false
		})
	},
	// 拆分分组
	splitGroup(e) {
		// console.log(e)
		let index=e.currentTarget.dataset.index;
		this.setData({
			showModal: true,
			componentText: {
				title: '小组成员',
				buttonText: '确定拆分',
				type:1
			}, //组件名字
		})
	},
	// 关联顾问
	associateConsultant(){
		this.setData({
			showModal: true,
			componentText: {
				title: '成员',
				buttonText: '确定关联',
				type:2
			}, //组件名字
		})
	},
	// 点击已录客户
	skipPage(e){
		let index=e.currentTarget.dataset.index;
		wx.navigateTo({
			url:'/pages/customerBrowse/customerGroup/index'
		})
	}
});
