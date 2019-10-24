import {
	imageURL
} from '../../utils/fetch'
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		show: { //   由父页面传递的数据，变量名字自命名
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal) {
				this.setData({
					showModal: newVal
				})
			},
		},
		height: { //   由父页面传递的数据，变量名字自命名
			type: Number,
			value: 0,
			observer: function(newVal, oldVal) {},
		},
		datalist: { //访客
			type: Array,
			value: [],
			observer: function(newVal, oldVal) {
				this.setData({
					dataList: newVal,
					listHeight:Math.ceil(newVal.length/3)*228
				})
			},
		},
		counselorlist: { //顾问
			type: Array,
			value: [],
			observer: function(newVal, oldVal) {
				this.setData({
					counselorList: newVal
				})
			},
		},
		componenttext: { //文字标题内容 //type 1 为拆分 2为关联
			type: Object,
			value: {},
			observer: function(newVal, oldVal) {
				this.setData({
					componentText: newVal,
					index: newVal.adviserIndex || 0,
				})
			},
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		index: 0,
		dataList: [], //访客
		counselorList: [], //职业顾问
		componentText: {}, //文字标题内容 
		showModal: false, //是否显示
		imageUrl: imageURL,
		lastX: 0,          //滑动开始x轴位置
		lastY: 0,          //滑动开始y轴位置
		currentGesture: 0, //标识手势
		listHeight:0,//列表的高度
		listPosition:0,//列表的位置
		lastX:0,
		lastY:0
	},

	behavior:{
		
	},
	ready(){
		
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		bindPickerChange(e) {
			this.setData({
				index: e.detail.value
			})
		},
		submit() {
			// 选中的人
			let list = [],
				recordIds = [];
			this.data.dataList.forEach((v, i) => {
				if (this.data.componentText.type == 1) {
					if (v.check) {
						list.push(v.visitorId);
					}
				} else {
					list.push(v.visitorId);
				}
				recordIds.push(v.id);
			})
			if (list.length == 0) {
				wx.showToast({
					title: '请选择人员',
					duration: 2000,
					icon: 'none'
				})
				return;
			}
			// 确定
			this.triggerEvent('submitmodal', {
				checkedList: list,
				counselorId: this.data.counselorList[this.data.index].propertyConsultantId,
				type: this.data.componentText.type,
				recordIds: recordIds
			})
		},
		// 关闭模态框
		closeModal() {
			this.triggerEvent('closemodal');
		},
		// 选择
		checkItem(e) {
			let index = e.currentTarget.dataset.index;
			let checkName = 'dataList.[' + index + '].check';
			this.setData({
				[checkName]: !this.data.dataList[index].check
			})
		},
		preventTouchMove() {

		},
		// //滑动移动事件
		//   handletouchmove: function (event) {
		//     var currentX = event.touches[0].pageX
		//     var currentY = event.touches[0].pageY
		//     var tx = currentX - this.data.lastX
		//     var ty = currentY - this.data.lastY
		// 	if(this.data.listHeight<=60) return;
		//     var listPosition = this.data.listPosition;
		// 	let minHeight = -(this.data.listHeight-460);
		//     //左右方向滑动
		//     if (Math.abs(tx) <= Math.abs(ty)) {
		// 		if (ty < 0){
		// 			console.log("向上滑动")
		// 			clearTimeout(this.timer1)
		// 			this.timer=setTimeout(()=>{
		// 				listPosition=listPosition-1;
		// 				if(this.data.listPosition>=minHeight){
		// 					listPosition=minHeight;
		// 					clearTimeout(this.timer)
		// 				}
		// 				this.setData({
		// 					listPosition:listPosition
		// 				})
		// 			},50)
		// 			// setTimeout(()=>{
		// 			// 	listPosition=listPosition-1;
		// 			// 	if(this.data.listPosition>=minHeight){
		// 			// 		listPosition=minHeight;
		// 			// 	}
		// 			// 	this.setData({
		// 			// 		listPosition:listPosition
		// 			// 	})
		// 			// },50)
		// 		}else if (ty > 0){
		// 			clearTimeout(this.timer)
		// 		  console.log("向下滑动")
		// 			// setTimeout(()=>{
		// 			// 	listPosition=listPosition+1;
		// 			// 	if(this.data.listPosition>=0){
		// 			// 		listPosition=0;
		// 			// 	}
		// 			// 	this.setData({
		// 			// 		listPosition:listPosition
		// 			// 	})
		// 			// },10)
		// 			this.timer1=setTimeout(()=>{
		// 				listPosition=listPosition+1;
		// 				if(this.data.listPosition>=0){
		// 					listPosition=0;
		// 					clearTimeout(this.timer1)
		// 				}
		// 				this.setData({
		// 					listPosition:listPosition
		// 				})
		// 			},10)
		// 		}
		//     }
		// 	console.log(this.data.listPosition)
		//     //将当前坐标进行保存以进行下一次计算
		//     this.data.lastX = currentX
		//     this.data.lastY = currentY
		//   },
		
		//   //滑动开始事件
		//   handletouchtart: function (event) {
		//     this.data.lastX = event.touches[0].pageX
		//     this.data.lastY = event.touches[0].pageY
		//   },
		//   //滑动结束事件
		//   handletouchend: function (event) {
		// 	clearTimeout(this.timer);
		// 	clearTimeout(this.timer1)
		//   },
	}
})
