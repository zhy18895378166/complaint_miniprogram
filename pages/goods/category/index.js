import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
  },
  async init() {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(event) {
    const target = event.detail;
    const problemsIdList = target.item.problemsIdList
    //console.log("which target click:", target)
    wx.navigateTo({
      url: `/pages/goods/list/index?problemsIdList=${JSON.stringify(problemsIdList)}`,
    });
  },
  onLoad() {
    this.init(true);
  },

  // navToCategoryCreate() {
  //   wx.navigateTo({
  //     //url: `/pages/order/createComment/index?orderNo=${this.orderNo}`,
  //     url: '/pages/goods/category/create/index',
  //   });
  // },
});
