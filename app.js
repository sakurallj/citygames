//app.js
//config
var domain = "https://api.taolue.fm";//  domain
var apiDomain ="https://api.taolue.fm";//api domain
 
App({
  globalData:{
    userInfo:{has:false},
    location:{latitude:null,longitude:null,speed:null,accuracy:null},
    url:{
      api:{//不能以 / 结尾
        home:apiDomain+"/Citygamesfortest/gethome",//首页
        socialHome:apiDomain+"/Citygamesfortest/socialHome",//获得球友圈首页
        login:apiDomain+"/Citygamesfortest/mbLogin",//登录
        getUserInfo:apiDomain+"/Citygamesfortest/mbGetInfo" ,//获得用户信息
        loginOut:apiDomain+"/Citygamesfortest/mbLogout", //登出  
        savePersonInfo:apiDomain+"/Citygamesfortest/mbEdit",//保存用户信息  
        getAccessToken:apiDomain+"/Citygamesfortest/getAccessToken"//获得accesstoken  
      }
    },
    app:{
      appSecret:"5c51186d20646e522e109043bfe2e863",
      appId:"wxc06f7a6f833c5f1c",
      accessToken:{
        accessToken:"",
        expiresIn:0,
        created:0
      }
    }
  },
  onLaunch: function () {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //获得地理位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.globalData.location.latitude = res.latitude;
        that.globalData.location.longitude = res.longitude;
        that.globalData.location.speed = res.speed;
        that.globalData.location.accuracy = res.accuracy;
      }
    })
  },
  getAccessToken:function(callback){
    var that = this;
    //判断是否有accesstoken
    var nt = parseInt(new Date().getTime()/1000);
    if(that.globalData.app.accessToken.accessToken
      &&that.globalData.app.accessToken.created+that.globalData.app.accessToken.expiresIn>=nt){
      if(typeof callback == "function") callback({
        accessToken:that.globalData.app.accessToken,
        errCode:0,
        errMsg:""
      });
    }
    else{
      wx.request({
        url:that.globalData.url.api.getAccessToken,
        success: function(res) {
          console.log(res.data);
          if(res.data.access_token ){
            that.globalData.app.accessToken = {
              accessToken:res.data.access_token,
              expiresIn:res.data.expires_in,
              created:nt
            };
            if(typeof callback == "function") callback({
              accessToken:that.globalData.app.accessToken,
              errCode:0,
              errMsg:""
            });
          }
          else{
            if(typeof callback == "function") callback({
              errCode:res.data.errcode,
              errMsg:res.data.errmsg
            });
          }
        }
      });
    }
   
  },
  getPageQrcode:function(callback){
    
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo.has){
      typeof cb == "function" && cb(this.globalData.userInfo);
    }else{
      //先从缓存中获得用户信息
      wx.getStorage({
        key: 'userInfo',
        complete: function(res) {
          console.log("get user info from Storage");
          if(res.data&&res.data.has){
            console.log("get user info from Storage success");
            that.globalData.userInfo = res.data;
            typeof cb == "function" && cb(that.globalData.userInfo);
          }
          else{
            console.log("get user info from fail");
            if(that.globalData.userInfo.token){
              console.log("get user info from api");
              wx.request({
                url:that.globalData.url.api.getUserInfo,
                data: {
                  token: that.globalData.userInfo.token
                }, 
                success: function(res) {
                  console.log(res.data);
                  if(res.data.errcode==0){
                    var token = that.globalData.userInfo.token;
                    that.globalData.userInfo = res.data.data;
                    that.globalData.userInfo.has =  true;
                    that.globalData.userInfo.token =  token;
                    //把用户信息保存到缓存
                    wx.setStorage({key:"userInfo",data:that.globalData.userInfo});
                    typeof cb == "function" && cb(that.globalData.userInfo);
                  }
                }
              });
            }
            else{
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          }
        } 
      });
      
    }
  },
  formatShowTime:function(date){
    var str="";
    if(!date){
      return date;
    }
    if(date instanceof Date){
      var nowDate = new Date();
      var nYear = nowDate.getFullYear();
      var nDay = nowDate.getDay();
      var nMonth  = nowDate.getMonth()+1;
      var nHour  = nowDate.getHours();
      var year = date.getFullYear();
      var day = date.getDay();
      var month  = date.getMonth()+1;
      var hour  = date.getHours();
      var minute  = date.getMinutes();
      var second  = date.getSeconds();
      if(nYear==year){
        if(nMonth==month&&nDay==day){
          return hour+":"+minute;
        }
        else{
          return month+"-"+day+" "+hour+":"+minute;
        }
      }
      else{
        return year+"-"+month+"-"+day+" "+hour+":"+minute;
      }
    }
    return date;
  },
  clearUserInfo:function(){
    this.globalData.userInfo = {has:false};
    wx.setStorage({
      key:"userInfo",
      data:{has:false}
    });
  }
});