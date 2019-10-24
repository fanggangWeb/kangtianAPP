//获取应用实例
const app = getApp()
import {
	fetch,
	imageURL
} from '../../../utils/fetch'
Page({
	data: {
		// 组件所需的参数
		navbarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '新建群组', //导航栏 中间的标题
		},
		height: app.globalData.statusBarHeight + app.globalData.headerHeight, // 此页面 页面内容距最顶部的距离
		imageUrl: imageURL,
		list: [{
			check: false,
			visitorNm:'大大',
			visitorImg:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 0
		}, {
			check: false,
			visitorImg:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 1
		}, {
			check: false,
			visitorImg:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 2
		}, {
			check: false,
			visitorImg:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 3
		}, {
			check: false,
			visitorImg:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 4
		}]
	},

	onReady() {

	},
	onLoad(options){
		this.setData({
			['navbarData.title']:options.title
		})
	},
	// 点击选择
	checkItem(e){
		let index = e.currentTarget.dataset.index;
		let checkName='list.['+index+'].check';
		this.setData({
			[checkName]:!this.data.list[index].check
		})
	},

});
