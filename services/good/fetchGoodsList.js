/* eslint-disable no-param-reassign */
import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const { delay } = require('../_utils/delay');
  const { getSearchResult } = require('../../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      item.desc = '';
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

async function fetchGoodsListFromCloud(supIdList) {
  let goods_list = []
  let ret
  const db = wx.cloud.database()
  const _ = db.command
  await db.collection("all_problems").where({
    // 需满足 _.in(supIdList)
    spuId: _.in(supIdList)
  }).get().then((res) => {
    res.data.map((item) => {
      item.thumb = item.primaryImage;
    })

    ret = {
      totalCount: 1,
      spuList: res.data
    }
  })
  //console.log("goods list:", ret)
  return ret
}

/** 获取商品列表 */
export function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params);
  }

  return new Promise((resolve) => {
    resolve(fetchGoodsListFromCloud(params));
  });
}
