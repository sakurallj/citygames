// pages/test/record/record.js
Page({
  data:{
    recodeTmpPath:"",
    src: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
   onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
    this.audioCtx.play()
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
  startRecord:function(){
    var that = this;
    wx.startRecord({
      success: function(res) {
        that.setData({
          recodeTmpPath:res.tempFilePath
        });
        console.log(res);
      },
      fail: function(res) {
        //录音失败
        console.log(res);
      }
    });
  },
  stopRecord:function(){
    wx.stopRecord();
  },
  startPlay:function(){
    if(this.data.recodeTmpPath){
       wx.playVoice({
          filePath: this.data.recodeTmpPath,
          complete: function(){
          }
        });
    }
  },
  stopPlay:function(){
     wx.stopVoice();
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})