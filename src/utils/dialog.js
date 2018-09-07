import Vue from 'vue'
function openDialog(option) {
  var dom = document.createElement('div');
  document.getElementsByTagName('body')[0].appendChild(dom);
  let tpl = '\
        <el-dialog \
            :close-on-click-modal="false" \
            :custom-class="customClass" \
            :title="title" \
            :visible.sync="show" \
            :size="size" \
            :before-close="handleClose" \
            @close="close">\
                <dialogContent  @close="closeDialog" @confirm="confirmDialog" :data="data"></dialogContent>\
        </el-dialog>';
  var vue = new Vue({
    el: dom,
    data: function () {
      return {
        title: option.title,
        size: option.size || 'small',
        show: true,
        data: option.data,
      };
    },
    template: tpl,
    computed: {
      customClass(){
        return `el-dialog--width-${option.size || 'auto'}`;
      }
    },
    methods: {
      handleClose(done){
        if (option.beforeClose) {
          option.beforeClose(done);
        } else {
          done();
        }
      },
      close() {
        if (option.close) {
          option.close();
        }
      },

      closeDialog(){
        this.show = false
      },
      confirmDialog(result){
        this.show = false
        option.confirm && option.confirm(result)
      }
    },
    components: {
      dialogContent: option.component,
    },
  });
  return vue;
}

export default {
  /**
   * open({
                    title: '标题标题',
                    size:'small', //可选项tiny/small/large/full, 对应el-dialog的size属性
                    component: SimpleDialogTest,
                    data: {
                        name: 'your name',
                    },
                   beforeClose: (done) => {
                        //点右上角关闭按钮后触发
                        console.log('dialog is closing');
                        done()
                    },
                    close: () => {
                        //关闭后触发
                        console.log('dialog is closed')
                    },
                    confirm: (result) => {
                        //显式$emit('confirm')时触发
                        console.log('dialog is confirmed, and dialog result is ', result)
                    }
                })
   * @param option
   */
  open(option){
    return openDialog(option);
  }
}
