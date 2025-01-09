Component({
  data: {
    categoryText: '',
    categoryValue: [],
  },

  properties: {
    mainCategoriesName: {
      type: Array,
      // observer:function(new_val,old_val,path){
      //   console.log("值变化了...", old_val, new_val, path)
      // }
    },
  },

  methods: {
    onColumnChange(e) {
      console.log('picker pick:', e);
    },

    onPickerChange(e) {
      const { key } = e.currentTarget.dataset;
      const { value } = e.detail;

      console.log('picker change:', e.detail);
      this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: value,
        [`${key}Text`]: value.join(' '),
      });
      this.triggerEvent( 'fromSon' , {name: value[0]} )
    },

    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },

    onCityPicker() {
      this.setData({ categoryVisible: true });
    },
  },
});
