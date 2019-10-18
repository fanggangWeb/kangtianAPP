// components/customerModel/index.js
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
					dataList: newVal
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
		componenttext: { //文字标题内容
			type: Object,
			value: {},
			observer: function(newVal, oldVal) {
				this.setData({
					componentText: newVal
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
			console.log(this.data.showModal)
			// 确定
			this.triggerEvent('submitmodal', {
				data: 111
			})
		},
		// 关闭模态框
		closeModal(){
			this.triggerEvent('closemodal');
		}
	}
})
