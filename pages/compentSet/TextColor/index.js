Component({
  externalClasses: ['text-class', 'right-view-hidden'],
  options: {},
  properties: {
    leftName: {
      type: String,
      value: ''
    },
    showText: {
      type: Boolean,
      value: false
    },
    rightName: {
      type: String,
      value: '-'
    },
  },
  methods: {
    _tapText() {
      this.triggerEvent('tapText', {})
    },
  }
})