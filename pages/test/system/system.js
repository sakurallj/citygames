// /pages/test/system/system.js
Page({
  data:{
    sysInfo:{}
  },
  onLoad:function(options){
    var that = this;
    wx.getSystemInfo({
    success: function(res) {
      console.log(res) ;
      that.setData({
        sysInfo:res
      });
    }
  });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})