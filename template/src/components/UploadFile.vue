<template>
  <div>
    <form action="" method="post" enctype="multipart/form-data" :id="id" v-show="!isUploading">
      <a class="file">
        <slot>选择文件</slot>
        <input type="file" class="" name="file" multiple @change="loadFile()">
      </a>
    </form>
    <div class="progress" v-show="isUploading">
      <div class="progress-bar active" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100" :style="'width:'+percent+'%;'" >
        <span >{{percent}}% </span>
      </div>
      <i aria-hidden="true" role="button" class="fa fa-times pull-right" @click="cancelUpload(index,2)"></i>
    </div>
  </div>
</template>
<script>
import mixin from "@/global/mixins"
export default {
  mixins: [mixin],
  props: ['value'],
  data: function() {
    return {
      id: this.guidGenerator(),
      isUploading: false,
      percent: 0,
      ajaxRequest: false,
    }
  },
  methods: {
    loadFile: function() {
      let vm = this
      let formData = new FormData($('#' + vm.id)[0])
      vm.isUploading = true
      vm.ajaxRequest = $.ajax({
        url: vm.serverApi + 'FileUpload/fileUpload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result) {
          vm.resetForm()
          if (result.code == 0) {
            vm.$emit('input', {
              'name': result.data.orig_name,
              'url': result.data.url,
              'ext': result.data.file_suffix
            })
          } else {
            vm.alert('文件上传失败，请重新上传', false)
          }
        },
        error: function() {
          vm.resetForm()
          vm.alert('文件上传失败，请重新上传', false)
        },
        xhr: function() {
          var xhr = $.ajaxSettings.xhr()
          xhr.upload.onprogress = function(event) {
            vm.percent = Math.ceil((parseFloat(event.loaded)/parseFloat(event.total))*100)
          }
          xhr.upload.onload = function() {
          }
          return xhr
        }
      })
    },
    resetForm: function() {
      let vm = this
      vm.isUploading = false
      vm.percent = 0
      vm.ajaxRequest = false
      $('#' + vm.id)[0].reset()
    },
    cancelUpload: function(){
      let vm = this
      if(vm.ajaxRequest){
        vm.ajaxRequest.abort()
      }
    }
  }
}
</script>
