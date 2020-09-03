//app.js
App({
  onLaunch: function (e) {
    this.globalData.key= e.query.key
  },
  globalData: {
    wxUrl: 'https://wxdev.mogul-tech.com/',
    key:''
  }
})