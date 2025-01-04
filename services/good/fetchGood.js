import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGood(ID = 0) {
  const { delay } = require('../_utils/delay');
  const { genGood } = require('../../model/good');
  return delay().then(() => genGood(ID));
}

async function fetchGoodDetails(ID = 0) {
  let ret;
  const db = wx.cloud.database()
  const _ = db.command
  await db.collection("homelist").where({
    // 需满足 _.eq(ID)
    spuId: _.eq(ID)
  }).get().then((res) => {
    res.data.map((item) => {
      ret = {
        ...item,
        spuId: `${ID}`,
        available: item.available,
        desc: item.desc,
        images: item?.images || [item?.primaryImage],
      }
    })
  })
  console.log("get goods list:", ret)
  return ret
}

/** 获取商品列表 */
export function fetchGood(ID = 0) {
  if (config.useMock) {
    return mockFetchGood(ID);
  }
  return new Promise((resolve) => {
    resolve(fetchGoodDetails(ID));
  });
}
