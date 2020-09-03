const app = getApp()
const getUrl = require("../../utils/getDataUrl.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    if (options.CustomerId == undefined) {
      wx.getStorage({
        key: 'CustomerId',
        success(res) {
          that.data.CustomerId = res.data
        }
      })
    } else {
      this.data.CustomerId = options.CustomerId
    }

    this.getData()

  },
  getData() { //产品
    const that = this
    getUrl.WXPostMost(that, 'api/sys/basicData/GetSysParamList', 'GET', {}, function (res) {
      if (res instanceof Array) {
        res.forEach((e) => {
          if (e.Key === "Product") { //产品
            that.data.parameter = e.Items
            that.data.parameter[0].checked = true
            that.setData({
              parameter: that.data.parameter
            })
          }
          if (e.Key === "Industry") { //行业
            that.data.parameter2 = e.Items
            that.data.parameter2[0].checked = true
            that.setData({
              parameter2: that.data.parameter2
            })
          }
          if (e.Key === "Type") { //类型
            that.data.parameter3 = e.Items
            that.data.parameter3[0].checked = true
            that.setData({
              parameter3: that.data.parameter3
            })
          }
        })
      }
    })
  },
  formSubmit(e) {
    debugger
    var data = e.detail.value,
      that = this
    if (data.ContactName !== '' && data.Cname !== '' && data.Tel !== '' && data.Web !== '' && data.Address !== '') {
      if (data.TypeValue == null) {
        data.Type = that.data.parameter3[0].Value
      } else {
        data.Type = data.TypeValue.value
      }
      if (data.ProductValue == null) {
        data.Product = that.data.parameter[0].Value
      } else {
        data.Type = data.ProductValue.value
      }
      if (data.IndustryValue == null) {
        data.Industry = that.data.parameter2[0].Value
      } else {
        data.Industry = data.IndustryValue.value
      }
      data.CustomerId = that.data.CustomerId
      getUrl.WXPostMost(that, 'api/Customer/CustomerClue/AddCustomerClue', 'POST', data, function (res) {
        getUrl.Toast('保存成功')
        wx.setStorage({
          key:"perfect",
          data:"100"
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../homeHq/index',
          })
        }, 2000)
      })
    } else {
      getUrl.Toast('必填项不能为空')
    }
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