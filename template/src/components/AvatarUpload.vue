<template>
  <div class="image text-center" role="button">
    <form action="" method="post" enctype="multipart/form-data" id="uploadAvatar">
      <input type="file" id="file" name="file" @change="loadAvatar()" />
    </form>
    <label for="file" role="button"><img :src="imageAfter"></label>
  </div>
</template>
<script>
  import mixins from '@/global/mixins'
  export default{
    props:['image'],
    mixins: [mixins],
    data(){
      return{
        imageAfter:'',
      }
    },
    created:function(){
      let vm = this
      vm.imageAfter =  vm.image
    },
    methods:{
      //头像上传
      loadAvatar: function() {
        var vm = this
        var formData = new FormData($('#uploadAvatar')[0])
        // var fileName = $("#"+fid+" input").val().split('/').pop().split('\\').pop();
        $.ajax({
          url: vm.serverApi + 'FileUpload/fileUpload',
          type: 'POST',
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          complete: function(result) {
            result = result.responseJSON
            if (result.code == 0) {
              vm.imageAfter = result.data.url
            }
            else {
              console.log('error')
            }
          }
        })
      },
    },
    //使用watch模拟双向绑定
    watch:{
      imageAfter: function(newValue, oldValue) {
        let vm = this
        vm.$emit('input', newValue)
      },
      image: function(newValue, oldValue) {
        let vm = this
        vm.imageAfter = newValue
      },
    }
  }
</script>
<style scoped lang="scss">
  $orange:#fc9644;
  .image{
    padding: 10px 0px;
    input{
      height: 0px;
      opacity: 0;
    }
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border:2px $orange solid;
    }
  }
</style>


