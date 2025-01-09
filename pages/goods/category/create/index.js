// import { getCommentDetail } from '../../../../services/good/comments/fetchCommentDetail';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    gridConfig: {
      width: 218,
      height: 218,
      column: 3,
    },
    isAllowedSubmit: false,
    isSubCategoryAdd: false,
    imageProps: {
      mode: 'aspectFit',
    },

    mainCategoriesName: [],
    mainCategoryName: "",
    subCategoryName: "",
    uploadFiles:[]
  },

  onLoad(options) {
    const btn = options.btn  
    console.log("xxxxbtn click:", btn)
    if (btn === 'sub')
      this.setData({isSubCategoryAdd: true})
    
    //todo, getMainCategoriesName
    let ret = ["安全问题","室外问题", "室内问题"]
    let list = []
    ret.forEach(name => {
      list.push({label: name, value: name})
    })
    this.setData({
      mainCategoriesName: list
    })
  },

  selectedMainCategoryName(e){
    //console.log(e.detail.name)
    this.setData({mainCategoryName: e.detail.name})
    this.updateButtonStatus();
  },

  onTextAreaChange(e) {
    const { isSubCategoryAdd } = this.data;
    const value = e?.detail?.value;
    this.updateButtonStatus();
    if (isSubCategoryAdd)
      this.setData({subCategoryName: value})
    else
    this.setData({mainCategoryName: value})
    console.log("input comment", value)
  },

  handleSuccess(e) {
    const { files } = e.detail;
    console.log("uploadFiles:", files)
    this.setData({
      uploadFiles: files,
    });
    this.updateButtonStatus();
  },

  handleRemove(e) {
    const { index } = e.detail;
    const { uploadFiles } = this.data;
    uploadFiles.splice(index, 1);
    this.setData({
      uploadFiles,
    });
  },

  updateButtonStatus() {
    const { mainCategoryName, subCategoryName, uploadFiles,isAllowedSubmit, isSubCategoryAdd } = this.data;
    const temp = (mainCategoryName && subCategoryName && (uploadFiles.length > 0)) ||
            !isSubCategoryAdd;
    if (temp !== isAllowedSubmit) this.setData({ isAllowedSubmit: temp });
  },

  onSubmitBtnClick() {
    const { isAllowedSubmit } = this.data;
    const { mainCategoryName, subCategoryName, uploadFiles } = this.data;
    const { isSubCategoryAdd } = this.data;
    
    if (!isAllowedSubmit) return;
    /* 添加子类 */
    if (isSubCategoryAdd) {
      //todo get mainCategoryId by mainCategoryName
      const data = {
        name: subCategoryName,
        cover: uploadFiles[0],
        mainCategoryId: "",
        createdAr: new Date()
      }
      console.log("upload sub category data:", data)

      //todo add to cloud DB
    } else {
      /* 添加主类 */
      console.log("upload main category data:", mainCategoryName)
    }

    // todo 判断上传状态
    const upLoadOk = true
    let msg;

    if (upLoadOk)
      msg = '数据添加成功'

      Toast({
      context: this,
      selector: '#t-toast',
      message: msg,
      icon: 'check-circle',
    });
    wx.navigateBack();
  },
});
