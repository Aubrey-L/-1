Page({

  /**
   * 页面的初始数据
   */
  data: {
    isButtomLogin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'CustomerId',
      success(res) {
        if (res.data !== undefined) {
          that.setData({
            isButtomLogin: false
          })
        }
      }
    })
    wx.getStorage({
      key: 'perfect',
      success(res) {
        if (res.data === '100') {
          wx.reLaunch({
            url: '../homeHq/index',
          })
        }
      }
    })
  },
  _login() {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  _save() {
    wx.navigateTo({
      url: '../formation/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})