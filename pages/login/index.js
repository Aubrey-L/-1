//logs.js
const util = require('../../utils/util.js')
const getUrl = require("../../utils/getDataUrl.js");
const app=getApp()
Page({
  data: {
    codeTitle: '获取验证码',
    isCode: false
  },
  onLoad: function () {

  },
  _getInputPhone(e) {
    const that = this
    if ((/^1[345789]\d{9}$/.test(e.detail.value))) {
      that.data.isCode = true
      that.data.istake = true
    } else {
      that.data.isCode = false
      that.data.istake = false
    }
    this.setData({
      isCode: that.data.isCode
    })
  },
  _agree() {
    const that = this
    wx.navigateTo({
      url: '../agreement/index',
    })
  },
  formSubmit(e) {
    const  that =this
    if (e.detail.value.CName !== '' && e.detail.value.vCode !== '' && e.detail.value.invitationCode !== '') {
      getUrl.saveData(that, 'api/Customer/CustomerClue/AddCustomerClue', 'POST', e.detail.value, function (res) {
         getUrl.Toast('注册成功')
        if(res.State==1){
          that.data.CustomerId=res.ReValue
          wx.setStorage({
            key:"CustomerId",
            data:res.ReValue
          })
        }
        wx.showModal({
          content: '红包已发送,完善信息可领取第二个红包，最高金额188元',
          showCancel: true,
          title: '注册成功',
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: '../formation/index?CustomerId='+that.data.CustomerId,
              })
            } else if (res.cancel) {
            }
          },
          fail: (res) => {},
          complete: (res) => {},
        })
      
      })

    } else {
      wx.showToast({
        title: '必填项不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  _getCode() {
    const that = this;
    if (that.data.isCode && that.data.istake) {
      var count = 60;
      var si = setInterval(function () {
        if (count > 0) {
          count--;
          that.data.istake = false
          that.data.isCode = true
          that.setData({
            codeTitle: '倒计时' + count + ' s',
            isCode: that.data.isCode
          });

        } else {
          that.setData({
            codeTitle: "获取验证码"
          });
          count = 60;
          that.data.istake = true
          that.data.isCode = false
          clearInterval(si);
          that.setData({
            isCode: that.data.isCode
          })
        }
      }, 1000);

    }

  },
})