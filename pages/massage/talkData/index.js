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
			title: '聊天信息', //导航栏 中间的标题
		},
		height: app.globalData.statusBarHeight + app.globalData.headerHeight, // 此页面 页面内容距最顶部的距离
		imageUrl: imageURL,
		list:[{
			visitorNm:'大大',
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 0
		}, {
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 1
		}, {
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 2
		}, {
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 3
		}, {
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 4
		}, {
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 5
		}, {
			imgPath:'folderName/2019-10-18/43902b93-2edd-4354-a95d-606b06c939a3.jpg',
			id: 6
		}],
		
	},

	onReady() {

	},
	// 添加成员
	addMember(){
		wx.navigateTo({
			url:'/pages/massage/addGroup/index?title=添加成员'
		})
	}
	
});
