// pages/person/mymessage/mymessage.js
var app = getApp();
Page({
  data:{
    map:{
      longitude:app.globalData.location.longitude,
      latitude:app.globalData.location.latitude,
      scale:16,
      markers: [{
        iconPath: "/pages/images/team-create-bb-active.png",
        id: 0,
        latitude: 0,
        longitude: 0,
        width:20,
        height: 20
      },{
        iconPath: "/pages/images/team-create-bb-active.png",
        id:2,
        latitude: 5,
        longitude: 5,
        width: 20,
        height: 20
      },{
        iconPath: "/pages/images/team-create-bb-active.png",
        id:2,
        latitude: -5,
        longitude: -5,
        width: 20,
        height: 20
      }]
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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