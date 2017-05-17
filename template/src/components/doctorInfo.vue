<template>
<!-- 个人信息侧边栏 -->
<div class="right-personinfo" :id="id">
  <i role="button" class="fa fa-times-circle" aria-hidden="true" @click="hidePersonalInfo"></i>
  <div class="page-header">
    <h2>{{normalLanPack.personalInfo[lanIndex]}}</h2>
  </div>
  <div class="image text-center">
    <avatar-upload :image="userInfo['avatar']" v-model="userInfo['avatar']"></avatar-upload>
  </div>
  <div class="row text-left">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <label class="">{{normalLanPack.firstNameTitle[lanIndex]}}</label>
      <input type="" name="" class="form-control" v-model="userInfo['firstName']">
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <label class="text-left">{{normalLanPack.lastNameTitle[lanIndex]}}</label>
      <input type="" name="" class="form-control" v-model="userInfo['lastName']">
    </div>
  </div>
  <div class="row text-left">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <label class="text-left">{{normalLanPack.title[lanIndex]}}</label>
      <input type="" name="" class="form-control" v-model="userInfo['title']">
    </div>
  </div>
  <div class="row text-left">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <label class="text-left">{{normalLanPack.affiliation[lanIndex]}}</label>
      <input type="" name="" class="form-control" v-model="userInfo['institution']">
    </div>
  </div>
  <div class="row text-left">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <label class="text-left">{{normalLanPack.phone[lanIndex]}}</label>
      <input type="" name="" class="form-control" v-model="userInfo['phone']">
    </div>
  </div>
  <div class="row text-left">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <label class="">LIC</label>
      <input type="" name="" class="form-control" v-model="userInfo['LIC']">
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
      <label class="text-left">NPI</label>
      <input type="" name="" class="form-control" v-model="userInfo['NPI']">
    </div>
  </div>
  <div class="row text-left">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <label class="text-left">DEA</label>
      <input type="" name="" class="form-control" v-model="userInfo['DEA']">
    </div>
  </div>
  <button class="btn btn-primary col-lg-12 col-md-12 col-sm-12 col-xs-12" @click="editDoctorInfo">{{normalLanPack.saveChange[lanIndex]}}</button>
</div>
<!-- /个人信息侧边栏 -->
</template>
<script>
  import mixins from '@/global/mixins'
  import avatarUpload from '@/components/AvatarUpload'
  export default{
    props:['id'],
    mixins: [mixins],
    components:{avatarUpload},
    data(){
      return{
        userInfo:[],
      }
    },
    created: function() {
      var vm = this
      vm.userInfo = vm.$store.state.userInfo
      //解析cookie
    },
    methods:{
      //隐藏个人详细信息
      hidePersonalInfo:function() {
        let vm = this
        $("#"+vm.id).css('display','none')
      },
      editDoctorInfo:function(){
        let vm = this
        $.post(vm.serverApi+"Doctor/save",{doctor:JSON.stringify(vm.userInfo)},function(res){
          if(res.code == 0){
            vm.alert('修改成功',true)
            //发送事件
            vm.$root.eventHub.$emit('updateUserInfo')
          } else{
            vm.alert('修改失败',false)
          }
          $('#'+vm.id).css('display','none')
        })
      },
    }
  }
</script>
<style scoped lang="scss">

  //个人信息侧边栏
  .right-personinfo{
    display: none;
    padding: 0px 30px 10px 30px;
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    width:400px;
    box-shadow: -2px 0px 10px #BBBBBB;
    background-color:#fff;
    z-index:999;
    i{
      position: relative;
      right:-150px;
      top:27px;
      font-size: 20px;
      color: #dddddd;
    }
    .page-header{
      padding: 0px;
      margin: 0px;
      h2{
        margin: 0px;
        margin-bottom: 10px;
      }
    }
    .row{
      margin-bottom: 10px;
    }
    .contact-p{
      padding: 20px 0px;
      font-weight: bold;
      font-size: 16px;
    }
    input{
      height: 30px;
    }
    button{
      margin-top: 150px;
      border-radius: 1px;
      height: 30px;
      line-height: 10px;
    }
  }
</style>
