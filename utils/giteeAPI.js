// giteeApi.js
const GITEE_TOKEN = 'your_gitee_token';
const OWNER = 'your_gitee_username';
const REPO = 'your_repository_name';
const BRANCH = 'main';

async function requestGiteeApi(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      header: {
        'Authorization': `token ${GITEE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: data,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(new Error(`Error: ${res.statusCode} ${res.data.message}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

async function addFile(filePath, content, commitMessage) {
  try {
    const url = `https://gitee.com/api/v5/repos/${OWNER}/${REPO}/contents/${filePath}`;
    const data = {
      content: wx.arrayBufferToBase64(wx.base64ToArrayBuffer(content)),
      message: commitMessage,
      branch: BRANCH
    };
    const response = await requestGiteeApi(url, 'POST', data);
    return response;
  } catch (error) {
    console.error('Error adding file:', error);
    throw error;
  }
}

async function updateFile(filePath, content, commitMessage, sha) {
  try {
    const url = `https://gitee.com/api/v5/repos/${OWNER}/${REPO}/contents/${filePath}`;
    const data = {
      content: wx.arrayBufferToBase64(wx.base64ToArrayBuffer(content)),
      message: commitMessage,
      sha: sha,
      branch: BRANCH
    };
    const response = await requestGiteeApi(url, 'PUT', data);
    return response;
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
}

async function deleteFile(filePath, commitMessage, sha) {
  try {
    const url = `https://gitee.com/api/v5/repos/${OWNER}/${REPO}/contents/${filePath}`;
    const data = {
      message: commitMessage,
      sha: sha,
      branch: BRANCH
    };
    const response = await requestGiteeApi(url, 'DELETE', data);
    return response;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

module.exports = {
  addFile,
  updateFile,
  deleteFile
};

/*----------------------------------------------------------------*/
// example.js
const giteeApi = require('./giteeApi.js');

async function uploadImage(filePath, imageContent) {
  try {
    const commitMessage = 'Upload image';
    const response = await giteeApi.addFile(filePath, imageContent, commitMessage);
    console.log('Image uploaded successfully:', response);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}

async function deleteImage(filePath, sha) {
  try {
    const commitMessage = 'Delete image';
    const response = await giteeApi.deleteFile(filePath, commitMessage, sha);
    console.log('Image deleted successfully:', response);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

async function updateJson(filePath, jsonContent, sha) {
  try {
    const commitMessage = 'Update JSON data';
    const response = await giteeApi.updateFile(filePath, JSON.stringify(jsonContent), commitMessage, sha);
    console.log('JSON updated successfully:', response);
  } catch (error) {
    console.error('Error updating JSON:', error);
  }
}

// 示例调用
const imagePath = 'path/to/your/image.png';
const imageContent = 'base64_encoded_image_content';
const jsonFilePath = 'path/to/your/file.json';
const jsonContent = {
  key: 'value',
  anotherKey: 'anotherValue'
};
const sha = 'file_sha_value'; // 获取文件的SHA值

uploadImage(imagePath, imageContent);
deleteImage(imagePath, sha);
updateJson(jsonFilePath, jsonContent, sha);
/*这是测试js代码*/
