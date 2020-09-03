const app = getApp()

//行业
function getDataItem() {
 

}
//弹出提示
function Toast(msg) {
  if (msg != "" || msg != undefined)
    wx.showToast({
      duration: 2500,
      icon: 'none',
      title: msg,
    })
}
//列表请求
function WXPostMost(that, uri, method, datas, resolve) {
  uri = app.globalData.wxUrl + uri + "?key=" + app.globalData.key
  wx.request({
    url: uri,
    method: method,
    data: datas,
    success(res) {
      wx.hideLoading()
      if (res.statusCode == 200) {
        if (res.data.State == 1) {
          processNull(res.data.ReValue)
          resolve(res.data.ReValue);
        } else {
          Toast(res.data.PromptMsg)
        }
      }
    },
    fail(res) {
      Toast('网络错误')
    },
    complete() {}
  })
}

function saveData(that, uri, method, datas, resolve) {
  wx.showLoading({
    title: '加载中...',
  })
  uri = app.globalData.wxUrl + uri + "?key=" + app.globalData.key
  wx.request({
    url: uri,
    method: method,
    data: datas,
    success(res) {
      wx.hideLoading()
      if (res.statusCode == 200) {
        if (res.data.State == 1) {
          resolve(res.data);
        } else {
          Toast(res.data.PromptMsg)
        }
      }
    },
    fail(res) {
      Toast('网络错误')
    },
    complete() {}
  })
}



function processNull(obj) {
  const ie = /^\d{4}-(?:0\d|1[0-2])-(?:[0-2]\d|3[01])( (?:[01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)?$/
  function process(target, key, value) {
    if (value === null) {
      target[key] = ''
    } else if (ie.test(value)) {
      target[key] = target[key].split(" ")[0];
    } else if (typeof value === 'object') {
      processObject(value)
    }
  }
  function processObject(obj) {
    if (obj instanceof Array) {
      obj.forEach((data, index) => {
        process(obj, index, data)
      })
    } else if (typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        process(obj, key, obj[key])
      })
    }
  }
  processObject(obj)
}



module.exports = {
  saveData:saveData,
  WXPostMost: WXPostMost,
  Toast: Toast,
  getDataItem: getDataItem,
}