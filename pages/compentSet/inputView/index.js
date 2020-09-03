Component({
  behaviors: ['wx://form-field'],
  externalClasses: ['text-class'],
  properties: {
    inputShow:{
      type: Boolean,
      value: false
    },
    isHid: {
      type: Boolean,
      value: false
    },
    isNostar:{
      type: Boolean,
      value: false
    },
    isBottom: {
      type: Boolean,
      value: false
    },

    types: {
      type: String,
      value: ''
    },
    isDis: {
      type: Boolean,
      value: false
    },
    InputValue: {
      type: String,
      value: ''
    },
    leftName: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入相关内容'
    },

  },
  data: {
    isClear: true
  },
  ready() {
    this.setData({
      value: this.data.InputValue
    })
  },
  methods: {
    _clear() {
      this.setData({
        InputValue: '',
        isClear: true,
        value: ''
      })
      this.triggerEvent('getClear')
    },
    getValues(e) {
      if (e.detail.value !== '') {
        this.setData({
          isClear: false
        })
      } else {
        this.setData({
          isClear: true
        })
      }
      this.triggerEvent('getInput', {
        value: e.detail.value
      })
      this.setData({
        value: e.detail.value
      })
    },
    getInputValue(e) {
      this.setData({
        value: e.detail.value
      })
    }
  }
})