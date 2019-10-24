//获取应用实例
const app = getApp()
import { fetch, imageURL} from '../../utils/fetch';
const { $Toast } = require('../../dist/base/index.js');
//Page Object
Page({
	data: {
		// 组件所需的参数
		navbarData: {
			showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
			title: '客户浏览', //导航栏 中间的标题
		},
		height: app.globalData.statusBarHeight+app.globalData.headerHeight, // 此页面 页面内容距最顶部的距离
		entered: [], //已录入
		notEentered: [], //未录入
		enteredShow: false, //已录入显示
		notEenteredShow:false, //未录入显示
		userId:wx.getStorageSync("userInfo").id,//当前登录人ID
		companyId:wx.getStorageSync("userInfo").companyId,//所属机构ID
		visitorList: [], //成员列表
		counselorList: [], //职业顾问
		componentText: {
			title: '小组成员',
			buttonText: '确定拆分',
			type: 1 //type 1 为拆分 2为关联
		}, //组件名字
		showModal: false, //是否显示模太框
		imageUrl:imageURL
	},
	//options(Object)
	onLoad: function(options) {
	},
	onReady: function() {
		// 获取顾问
		this.getAdviserList();
	},
	onShow: function() {
		// 已录入
		this.getData('entered');
		// 未录入
		this.getData('notEentered');
	},
	onHide: function() {

	},
	onUnload: function() {

	},
	onReachBottom: function() {

	},
	// 模态框点击确认
	modalSubmit(e) {
		let data=e.detail;
		//type 1 为拆分 2为关联
		if(data.type==1){
			this.splitGroupMember(data.checkedList,data.counselorId);
		}else if(data.type==2){
			this.bindGroupMember(data.checkedList,data.counselorId)
		}
		
	},
	// 关闭模态框
	closeModal() {
		this.setData({
			showModal: false
		})
	},
	// 长按未录入客户拆分分组
	splitGroup(e) {
		let index = e.currentTarget.dataset.index;
		this.queryGroupMemberById(this.data.notEentered[index].id);
	},
	// 点击关联顾问
	associateConsultant() {
		// 选中的人
		let list=[];
		this.data.notEentered.forEach((v,i)=>{
			if(v.check){
				list.push(v);
			}
		})
		if(list.length==0){
			this.wxAlert('请选择人员');
			return;
		}
		this.setData({
			showModal: true,
			componentText: {
				title: '成员',
				buttonText: '确定关联',
				type: 2
			}, //组件名字
			visitorList:list
		})
	},
	// 点击已录客户
	skipPage(e) {
		let index = e.currentTarget.dataset.index;
		wx.navigateTo({
			url: '/pages/customerBrowse/customerGroup/index?visitorRecordId='+this.data.entered[index].id
		})
	},
	// 点击未录入客户-选择
	checkItem(e){
		let index = e.currentTarget.dataset.index;
		let name = e.currentTarget.dataset.name;
		let checkName=name+'['+index+'].check';
		this.setData({
			[checkName]:!this.data[name][index].check
		})
	},
	// 获取数据
	getData(name) {
		let data = {
			startPosition: 0,
			maxLength: 9000,
			visitorState: name == 'entered' ? 0 : 1
		}
		fetch({
			url: "/lobby/getVisitorList",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				res.data.forEach((v, i) => {
					if(name=='notEentered') v.check = false;
				})
				this.setData({
					[name]: res.data,
					[name+'Show']:true
				})
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel:false
				});
			}
		})
	},
	// 绑定成员 
	bindGroupMember(visitorIds,sysUserId){
		let data = {
			visitorIds:visitorIds,
			sysUserId:this.data.userId
		}
		fetch({
			url: "/lobby/bindGroupMember",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				this.wxAlert('绑定成功');
				setTimeout(()=>{
					// 已录入
					this.getData('entered');
					// 未录入
					this.getData('notEentered');
					this.setData({
						showModal: false
					})
				}, 2000);
				
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel:false
				});
			}
		})
	},
	// 获取置业顾问
	getAdviserList(){
		let data = {
			companyId:this.data.companyId
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
					content: res.data.message,
					showCancel:false
				});
			}
		})
	},
	// 根据客户到访记录ID 查询群组成员 
	queryGroupMemberById(id){
		let data = {
			visitorRecordId :id
		}
		fetch({
			url: "/lobby/queryGroupMemberById",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				if(res.data[0].groupId){
					let adviserIndex=0,list=[],data=res.data[0];
					if(res.data[0].sysUserId){
						this.data.counselorList.forEach((v,i)=>{
							if(v.propertyConsultantId==data.sysUserId){
								adviserIndex=i;
							}
						})
					}
					data.groupMemberInfos.forEach((v, i) => {
						let obj = {
							id:v.visitorRecordid,
							level: v.visitorLevel,
							state: null,
							status: data.status,
							sysUserId: data.sysUserId,
							username: data.userName,
							visitCnt: v.visitCount||0,
							visitorId: v.visitorId,
							visitorImg: v.visitorImg,
							visitorNm: v.visitorName,
							check:false,
						}
						list.push(obj);
					})
						
					this.setData({
						showModal: true,
						componentText: {
							title: '小组成员',
							buttonText: '确定拆分',
							type: 1,
							adviserIndex:adviserIndex
						}, //组件名字
						visitorList:list
					})
				}else{
					wx.showModal({
						title: '提示',
						content: '该成员暂未分组',
						showCancel:false
					});
				}
				
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel:false
				});
			}
		})
	},
	// 拆分成员 
	splitGroupMember(visitorIds,sysUserId){
		let data = {
			visitorIds:visitorIds,
			sysUserId:sysUserId
		}
		fetch({
			url: "/lobby/splitGroupMember",
			method: "post",
			data: data
		}).then(res => {
			if (res.code == 1) {
				this.wxAlert('拆分成功');
				// 已录入
				this.getData('entered');
				// 未录入
				this.getData('notEentered');
				this.setData({
					showModal: false
				})
			} else {
				wx.showModal({
					title: '错误',
					content: res.data.message,
					showCancel:false
				});
			}
		})
	},
	wxAlert(text,time){
		wx.showToast({
		  title: text,
		  duration: time||2000,
		  icon:'none'
		})
	}
});
