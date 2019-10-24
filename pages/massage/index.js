//获取应用实例
const app = getApp()
import {
	fetch,
	imageURL
} from '../../utils/fetch'
Page({
	data: {
		// 组件所需的参数
		navbarData: {
			showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
			title: '康田置业售楼部', //导航栏 中间的标题
		},
		height: app.globalData.statusBarHeight + app.globalData.headerHeight, // 此页面 页面内容距最顶部的距离
	},

	onReady() {

	},
	// 进入聊天
	intoChat() {
		// let index=e.currentTarget.dataset.index;
		wx.navigateTo({
			url:'/pages/massage/talkList/index'
		})
	}
});
