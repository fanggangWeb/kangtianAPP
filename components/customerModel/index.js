// components/customerModel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0,
    array: [{ id: 0, name: '某1' }, { id: 1, name: '某2' }, { id: 2, name: '某3' }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e){
      this.setData({
        index: e.detail.value
      })
    }
  }
})
