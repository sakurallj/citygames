var app = getApp();
Page({
  data:{
    pageNum:0,//页码 
    dataAction:"more",//加载的数据方式  more加载更多  refresh 刷新
    dynamics:[//动态
       
    ]
  },
  loadSocialHome:function(that,callback){
    var pageNum = that.data.pageNum;
    that.setData({
      pageNum:++pageNum
    });
    wx.request({
          url:app.globalData.url.api.socialHome,
          data: {
            page: pageNum,
            pagesize:4
          }, 
          success: function(res) {
            //首页顶部的数据
            if(res.data.list){
              var len =res.data.list.length,dynamics=[];
              if(that.data.dataAction == "more"){
                dynamics=that.data.dynamics;
              }
              else{
                that.setData({
                  dataAction:"more"
                });
              }
              for(var i=0;i<len;i++){
                var dynamic = res.data.list[i];
                dynamic.commtime = app.formatShowTime(new Date(dynamic.commtime*1000));
                dynamic.photosStr = JSON.stringify(dynamic.photos);
                dynamics[dynamics.length] = dynamic;
              }
              that.setData({
                dynamics:dynamics
              });
            }
            if (typeof callback == "function")callback();
          }
        });
  },
  onLoad:function(options){
    wx.showNavigationBarLoading();
    this.loadSocialHome(this,function(){
      wx.hideNavigationBarLoading();
    });
  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '球友圈2'
    });
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  previewSocialImage:function(event){

     var dataSet = event.currentTarget.dataset;
    if(dataSet){    console.log(event);
      if(dataSet.photos){
        var photos = JSON.parse(dataSet.photos);
        var photosUrlList = [],len=photos.length;
        for(var i=0;i<len;i++){
          var photo = photos[i];
          photosUrlList[i] = photo.image?photo.image:photo.thumb;
        }
        if(photosUrlList.length>0){
          console.log(photosUrlList);
          wx.previewImage({
            current:photosUrlList[dataSet.currentItemSeq], // 当前显示图片的http链接
            urls:photosUrlList, // 需要预览的图片http链接列表
            success:function(){
              console.log("success");
            },
            fail:function(){
              console.log("fail");
            },
            complete:function(){
              console.log("complete");
            }
          });
        }
      }
    }
  },
  onPullDownRefresh: function () {
     this.setData({
      pageNum:0,
      dataAction:"refresh"
    });
    wx.showNavigationBarLoading();
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    });
    this.loadSocialHome(this,function(){
      wx.hideNavigationBarLoading();
      wx.hideToast();
    });
  },
   onShareAppMessage: function () {
    return {
      title: '球友圈球友圈球友圈球友圈球友圈球友圈球友圈球友圈',
      desc: '球友圈的球友圈的球友圈的球友圈的球友圈的球友圈的球友圈',
      path: '/pages/social/social'
    }
  },
  onReachBottom:function(){
    wx.showNavigationBarLoading();
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    });
    this.loadSocialHome(this,function(){
      wx.hideNavigationBarLoading();
      wx.hideToast();
    });
  }
});