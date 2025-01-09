import { config,cdnBase } from '../../config/index';

import { getImagesUrls } from '../../utils/giteeOper.js';

/** 获取首页数据 */
function mockFetchHome() {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genSwiperImageList
  } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [{
          text: '精选推荐',
          key: 0,
        },
        {
          text: '夏日防晒',
          key: 1,
        },
        {
          text: '二胎大作战',
          key: 2,
        },
        {
          text: '人气榜',
          key: 3,
        },
        {
          text: '好评榜',
          key: 4,
        },
        {
          text: 'RTX 30',
          key: 5,
        },
        {
          text: '手机也疯狂',
          key: 6,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

async function fetchSwiperImagesFromCloud() {
  let goods_list = []
  let supIdList
  const db = wx.cloud.database()
  const _ = db.command

  await db.collection("swiper_images").get().then((res) => {
    supIdList = res.data[0].problems_id
    console.log(supIdList)
  })

  await db.collection("all_problems").where({
    // 需满足 _.in(supIdList)
    spuId: _.in(supIdList)
  }).get().then((res) => {
    res.data.map((item) => {
      goods_list.push(item.primaryImage)
    })
  })
  //console.log("swiper image list:", goods_list)
  return goods_list
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }

  return new Promise((resolve) => {
    resolve(fetchSwiperImagesFromCloud());
  })
}