import { config } from '../../config/index';
import { requestAsync, getImagesUrls } from '../../utils/giteeOper.js';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

async function fetchHomeListFromCloud(pageIndex = 1, pageSize = 20) {
  let goods_list = []
  await wx.cloud.database().collection("all_problems").get().then((res) => {
    //console.log("xxxxx",res)
    res.data.map((item) => {
      goods_list.push({
              spuId: item.spuId,
              thumb: item.primaryImage,
              title: item.title,
      })
    })
  })
  //console.log("goods_list:", goods_list)
  return goods_list
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    resolve(fetchHomeListFromCloud(pageIndex, pageSize));
  });
}
