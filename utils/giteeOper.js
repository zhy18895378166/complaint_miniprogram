import { token,owner,repo } from '../config/private_config.js';

/*  封装wx.request 为Promise */
export function requestAsync(path) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}?access_token=${token}`,
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          const urls = res.data.map(file => file.download_url);
          resolve(urls);
        } else {
          reject(`Error: ${res.statusCode} ${res.data.message}`);
        }
      },
      fail: (err) => {
        reject(`Request failed: ${err}`)
      }
    })
  });
}

export async function getImagesUrls(path) {
  try {
    const img_urls = await requestAsync(path)
    //console.log('Swiper Image List: ', img_urls);
    return img_urls
  } catch (error) {
    console.error('Failed to fetch', error)
    return []
  }
}

export async function getImagesAndVideos(folder_name) {
  const img_path = `images/${folder_name}`
  const video_path = `videos/${folder_name}`
  try {
    const img_urls = await requestAsync(img_path)
    const videos_urls = await requestAsync(video_path)
    //console.log('Swiper Image List: ', img_urls);
    //return {image: img_urls, video: videos_urls}
    return [img_urls, videos_urls]
  } catch (error) {
    console.error('Failed to fetch', error)
    //return {image: [], video: []}
    return [[], []]
  }
}
