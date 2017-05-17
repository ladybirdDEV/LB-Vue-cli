import { mapState } from 'vuex'
import dateFormat from 'dateformat'
import pinyin from 'han'
export default {
  data() {
      return {
        serverApi: '',
        normalLanPack: [],
        caseLanPack: [],
        //用户信息编辑
        userInfo: [],
        // userOtherInfo: [],
        isPageLoadingFlag: false,
      }
    },
    created: function() {
      var vm = this
        //将serverApi赋值
      vm.serverApi = vm.$store.state.serverApi
        //从vuex中拿到语言包
      vm.normalLanPack = vm.$store.state.normalLanPack
      vm.caseLanPack = vm.$store.state.caseLanPack
      // console.log(vm.$store.state.userInfo)
    },
    //将vuex中的state通过mapState计算出来让组件直接使用
    computed: mapState({
      lanIndex: state => state.lanIndex,
      port: state => state.port
    }),
    methods: {
      //获取用户头像方法
      getAvatar(type,sex){
        var avatar = ''
        switch (type){
          case 1:
            avatar = "http://img2.ciurl.cn/flashsale/upload/xinfotek_upload/2016/10/13/1476341039744775.png"
            break
          case 2:
            avatar = "https://clinic.baichengyiliao.com/fileupload/upload/2017/04/16/85442077ed60a2eee416090a2cf22a6b.jpg"
            break
          case 3:
            avatar = sex != 1 ?
                  "https://clinic.baichengyiliao.com/fileupload/upload/2017/04/16/e27b5495056ae33a9a10cdb57d33d7e9.jpg" :
                  "https://clinic.baichengyiliao.com/fileupload/upload/2017/04/16/8493f324b0bb416959d79e6d84415b43.jpg"
        }
        return avatar
      },
      alert: function(text, isSuccess = true) {
        this.$root.$refs.alert.text = text
        this.$root.$refs.alert.showToast(isSuccess ? 'success' : 'danger')
      },
      confirm: function(text, okCallback, title, cancelCallback) {
        var vm = this
        $('#globalConfrim').off('hidden.bs.modal')
        return new Promise(function(resolve, reject) {
          title = title ? title : '系统提示'
            // console.log('ok')
            // console.log(vm.$root)
            // return
          vm.$root.$refs.confirm.title = title
          vm.$root.$refs.confirm.text = text
          vm.$root.$refs.confirm.method = function() {
            $("#globalConfrim").modal('hide')
            $('#globalConfrim').on('hidden.bs.modal', function(e) {
              okCallback && okCallback()
              resolve(1)
            })
          }

          vm.$root.$refs.confirm.cancelMethod = function() {
            $('#globalConfrim').on('hidden.bs.modal', function(e) {
              cancelCallback && cancelCallback()
              reject(0)
            })
          }

          $("#globalConfrim").modal('show')
        })
      },
      date: function(date, pattern, defaultVal = '') {
        if (!date) {
          return defaultVal
        }
        return dateFormat(date, pattern)
      },
      dayOfTheweek: function(date) {
        return dateFormat(date, 'dddd')
      },
      htmlEntity: function(str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
      },
      pinyin: function(char) {
        if (!char) {
          return ''
        }
        let convert = pinyin.letter(char,' ')
        return convert
      },
      guidGenerator: function() { //生产唯一的字符串
        var S4 = function() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
      },
      openDocumentWindow: function(content) {
        let openWindow = window.open("/#/document", 'documentWindow', "width=1000,height=800")
        openWindow.content = content
      },
      openAttachmentLink: function(url) {
        window.open(url);
      },
    },
    watch: {
      isPageLoadingFlag: function(newVal, oldVal) {
        const vm = this
        if (newVal) {
          $(vm.$el).find('.loading-content .hide-content').css('opacity', 0)
          $(vm.$el).find('.loading-content').append('<div class="text-center pageloading-box"><i class="fa fa-spinner fa-pulse fa fa-fw fa-5x"></i><span class="sr-only">Loading...</span></div>')
        } else {
          setTimeout(function() {
            $(vm.$el).find('.loading-content .pageloading-box').remove()
            $(vm.$el).find('.loading-content .hide-content').css('opacity', 1)
          }, 100)
        }
      }
    }
}
