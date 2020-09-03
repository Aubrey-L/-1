// pages/packetRed.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field'],
  properties: {
    parameter:{
      type:Array,
      value:[]
    },
    title:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    parameterTap:function(e){
      const that=this
      const this_checked = e.currentTarget.dataset.index
      this.data.parameter.forEach((value)=>{
        value.checked=false
      })
      this.data.parameter[this_checked].checked=true
      that.setData({
        parameter: that.data.parameter,
        value:{
          index: e.currentTarget.dataset.index,
          value:e.currentTarget.dataset.id
        }
      })
      this.triggerEvent('parameter', {
        value:e.currentTarget.dataset.id
      })
    },
  }
})
