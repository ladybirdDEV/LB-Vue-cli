<template>
  <html5-editor :content="content" @change="changeContent" :auto-height="false" :height="realHeight" >
  </html5-editor>
</template>
<script>
import vueHtml5Editor from 'vue-html5-editor'
let option = {
        // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
        // global component name
        name: "vue-html5-editor",
        // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
        // if set true,will append module name to toolbar after icon
        showModuleName: false,
        // 自定义各个图标的class，默认使用的是font-awesome提供的图标
        // custom icon class of built-in modules,default using font-awesome
        autoHeight:false,
        // 配置图片模块
        // config image module
        image: {
          // 后端图片上传的地址，如果为空，默认转图片为base64
          // Url of the server-side,default null and convert image to base64
          server: null,
          // 请求时表单参数名
          // the name for file field in multipart request
          fieldName: "image",
          // 文件最大体积，单位字节  max file size
          sizeLimit: 512 * 1024,
          // 是否压缩，默认true，设置为true时会使用localResizeIMG进行压缩
          // default true,if set to true,the image will resize by localResizeIMG (https://github.com/think2011/localResizeIMG)
          compress: true,
          // 图片压缩选项
          // follows are options of localResizeIMG
          width: 1600,
          height: 1600,
          quality: 80,
          // 响应数据处理
          // handle response data，return image url
          uploadHandler(responseText) {
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText)
            if (!json.ok) {
              // alert(json.msg)
            } else {
              return json.data
            }
          }
        },
        // 语言，内建的有英文（en-us）和中文（zh-cn）
        //default en-us, en-us and zh-cn are built-in
        language: "zh-cn",
        // 自定义语言

        // 隐藏不想要显示出来的模块
        // the modules you don't want
        hiddenModules: [],
        // 自定义要显示的模块，并控制顺序
        // keep only the modules you want and customize the order.
        // can be used with hiddenModules together
        visibleModules: [
          "text",
          "color",
          "font",
          "align",
          "list",
          "link",
          "unlink",
          "tabulation",
          "image",
          "hr",
          // "eraser",
          "undo",
          "full-screen",
        ],
        // 扩展模块，具体可以参考examples或查看源码
        // extended modules
        modules: {
          //omit,reference to source code of build-in modules
        }
      }
let html5Editor = new vueHtml5Editor(option)
export default {
  components: {
    html5Editor
  },
  props: ['value', 'width', 'height','lan'],
  data: function() {
    return {
      content: '',
      realHeight:114,
    }
  },
  created: function() {
    let vm = this
    if(parseInt(vm.height)){
      vm.realHeight = vm.height-36
    }
    vm.content = vm.value
  },
  methods: {
    closeAlert: function() {
      var vm = this
      vm.isShow = false
    },
    showAlert: function(type) {
      var selector = '.' + type
      vm.isShow = true
      setTimeout(function() {
        vm.isShow = false
      }, 800)
    },
    showToast: function(type) {
      var vm = this
      vm.type = type
      vm.isShow = true
      if (vm.autoclose) {
        setTimeout(function() {
          // $('#'+vm.id).removeClass('active')
          vm.isShow = false
        }, 800)
      }
    },
    changeContent: function(newContent) {
      let vm = this
      vm.$emit('input',newContent)
    }
  },
}
</script>
