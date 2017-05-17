<template>
  <div>
    <tinymce :content="content" @change="changeContent" :id="id" :options="option" v-model="editContent">
    </tinymce>
  </div>
</template>
<script>
import mixin from '@/global/mixins'
export default {
  mixins: [mixin],
  components: {},
  props: {
    'value':null,
    'lan': {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {
      content: '',
      realHeight: 114,
      id: '',
      option: {
        menubar: false,
        theme: 'modern',
        'plugins': "table,fullscreen,link,image",
        toolbar: 'bold, underline,alignleft, aligncenter,image,table,fullscreen',
        images_upload_url: '',
        automatic_uploads: true,
        file_picker_types: 'image',
        language_url: 'static/tinymce/lang/zh_CN.js', // site absolute URL
        language: 'zh_CN',
      },
      editContent: '',
      imageUploadId: '',
      uploadImage: {},
    }
  },
  created: function() {
    let vm = this
    vm.id = vm.guidGenerator()
    vm.imageUploadId = vm.guidGenerator()
    vm.option.file_picker_callback = this.doupload
    vm.option.images_upload_url = this.serverApi + 'FileUpload/upload'
    vm.content = vm.value
    vm.option.language = vm.lan==1?'zh_CN':"en"
  },
  methods: {
    changeContent: function() {
      let vm = this
      vm.$emit('input', vm.editContent)
    },
    guidGenerator: function() { //生产唯一的字符串
      var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
    },
    doupload: function(cb, value, meta) {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.onchange = function() {
        let file = this.files[0]
        let id = 'blobid' + (new Date()).getTime()
        let blobCache = tinymce.activeEditor.editorUpload.blobCache
        let blobInfo = blobCache.create(id, file)
        blobCache.add(blobInfo)
        cb(blobInfo.blobUri(), {
          title: file.name
        })
      }
      input.click()
    }
  },
  watch: {
    value: function(newValue, oldValue) {
      if (newValue == "" && oldValue.length != 1) {
        tinymce.get(this.id).setContent("")
      }
    },
    uploadImage: function() {

    }
  }
}
</script>
