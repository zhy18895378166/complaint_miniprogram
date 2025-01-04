import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList());
}


async function fetchProblemsCategoryFromCloud() {
  let category_list = []
  //wx.cloud.database().collection("problems_category").add({data: cate})
  await wx.cloud.database().collection("problems_category").get().then((res) => {
    console.log("problems category: ",res)
    res.data.map((item) => {
      console.log(item)
      category_list.push(item)
    })
  })
  console.log("category_list:", category_list)
  return category_list
}

/** 获取商品列表 */
export async function getCategoryList() {
  if (config.useMock) {
    return mockFetchGoodCategory();
  }
  
  const ret = await fetchProblemsCategoryFromCloud()
  return new Promise((resolve) => {
    resolve(ret);
  });
}
