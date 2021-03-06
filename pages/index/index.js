import { handleList } from '../../base/class.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    textList: [],
    listNum: 0,
    deg: 135,
    colorArr: [
      "#6956ec, #56b2ba",
      "#3023ae, #c86dd7",
      "#bd4de8, #ff2366",
      "#fd4935, #fad414",
      "#72afd3, #37ecba"
    ]
  },
  goDetail: function (event) {
    const Id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../post/post?id=${Id}`,
      fail: function (res) { console.log(res) },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setTabBarStyle({
    //   color: '#FFFFFF',
    //   selectedColor: '#00FF00',
    //   backgroundColor: '#000000',
    //   borderStyle: 'white'
    // }
    let sub = 1;
    let right = 200;
    let left = 135;
    let timer = setInterval(() => {
      this.setData({
        deg: (this.data.deg + sub)
      })
      if (Math.ceil(this.data.deg) == right || Math.ceil(this.data.deg) == left) {
        sub = -sub;
      } 
    }, 1000 / 60)
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/columns/timer365/posts',
      data: {
        limit: 5
      },
      success: (res) => {
        const con = {
          textList: handleList(res.data),
        };
        this.data.listNum += 5;
        this.setData(con);
      }
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
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/columns/timer365/posts',
      data: {
        limit: 5,
        offset: this.data.listNum
      },
      success: (res) => {
        this.data.listNum += 5;
        // const moreCon = this.data.textList.concat(handleList(res.data))
        const moreCon = [...(this.data.textList), ...(handleList(res.data))]
        const con = {
          textList: moreCon,
        };
        this.setData(con);
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    const imgUrl = res.target.dataset.img;
    const title = res.target.dataset.title;
    const path = `/pages/post/post?id=${res.target.dataset.id}&share=1`;
    return {
      title: title,
      path: path,
      imageUrl: imgUrl,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    }
  }
})