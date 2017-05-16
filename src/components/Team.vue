<template>
  <div class="team-detail">
    <div class="more-case-team">
      <div class="case-team-panel">
        <div class="panel-header" v-show="port == 2 || (port == 3 && $route.params.serviceId) || (port == 1 && $route.params.serviceId)">{{normalLanPack.doctorTeam[lanIndex]}}</div>
        <div class="panel-header" v-show="port == 3 && !$route.params.serviceId">{{normalLanPack.alreadyShared[lanIndex]}}</div>
        <div class="panel-body">
          <div class="items">
            <div class="item" v-for='(data,index) in totalData'>
              <div class="avatar">
                <img :src="data.avatar?data.avatar:'https://clinic.baichengyiliao.com/fileupload/upload/2017/04/16/85442077ed60a2eee416090a2cf22a6b.jpg'">
              </div>
              <div class="line">
                <div class="base-info col-lg-10">
                  <div class="name" v-show='lanIndex == 1'>{{data.lastName}} {{data.firstName}}</div>
                  <div class="name" v-show='lanIndex == 2'>{{data.firstName}} {{data.lastName}}</div>
                  <div class="title" role="button" :title="data.titleShow">{{data.institution}}{{data.title}}</div>
                </div>
              <!--   <div class="contact-icon col-lg-2">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </div> -->
              </div>
            </div>
          </div>
<!--           <div class="divider-item" v-show="port == 2 || (port == 3 && $route.params.serviceId)">{{normalLanPack.yourManager[lanIndex]}}</div>
          <div class="item" v-show="port == 2 || (port == 3 && $route.params.serviceId)">
            <div class="avatar">
              <img src="https://s3-us-west-1.amazonaws.com/more-health-kernel/0_case_manager_photo/Xiaobing+Tan.jpg">
            </div>
            <div class="line">
              <div class="base-info col-lg-10">
                <div class="name">Tan Xiaobing</div>
                <div class="title"></div>
              </div>
              <div class="contact-icon col-lg-2">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
            </div>
          </div> -->
        </div>
        <div v-if="canInvite" class="button thin" role="button" id="invite-btn" @click="showInviteBox">{{normalLanPack.inviteDoctor[lanIndex]}}</div>
        <!-- 更多 -->
        <div v-else class="more text-right"><span role="button"></span></div>
        <!-- /更多 -->
        <div class="invite-box text-left" style="display:none" id="invite-box">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label class="">{{normalLanPack.nameTitle[lanIndex]}}</label>
              <input type="" name="" class="form-control" v-model="inviteName">
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :class="{'has-error':submitFlag&&invitePhone==''}">
              <label class=""><span class="asterisk">*</span>{{normalLanPack.phone[lanIndex]}}</label>
              <input type="" name="" class="form-control" v-model="invitePhone">
            </div>
          </div>
          <div v-if="port == 1||port == 2" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" :class="{'has-error':submitFlag&&inviteEmail==''}">
              <label class=""><span class="asterisk">*</span>{{normalLanPack.email[lanIndex]}}</label>
              <input name="email"  v-validate="'required|email'" data-vv-delay="1000" type = "text" class="form-control" v-model="inviteEmail">
            </div>
          </div>
          <div v-if="port == 1||port == 2" class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <label class="">{{normalLanPack.content[lanIndex]}}</label>
              <textarea class="form-control" v-model="inviteContent"></textarea>
            </div>
          </div>
          <div class="row button-box">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <button class="btn btn-default" @click="showInviteBtn">{{normalLanPack.cancel[lanIndex]}}</button>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <button class="btn btn-primary" @click="inviteDoctor">{{normalLanPack.sendBtn[lanIndex]}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '@/global/mixins'
export default{
  mixins: [mixins],
  props: ['canInvite'],
  data(){
    return{
      submitFlag:false,
      totalData:[],
      //邀请医生
      inviteName: '',
      invitePhone: '',
      inviteEmail: '',
      inviteContent: '',
      invite: true,
    }
  },
  created:function(){
    let vm = this
    if(vm.port == 3){
      vm.getPatientTeam()
    } else{
      vm.getCaseOrServiceTeam()
    }
  },
  methods:{
    //获取案例或者服务的医生团队
    getCaseOrServiceTeam:function(){
      let vm = this
      $.post(vm.serverApi+"Cases/caseDoctors",{
          caseId:vm.$route.params.caseId,
          serviceId:vm.$route.params.serviceId
        },function(res){
        if(res.code == 0){
          vm.totalData = res.data
          for(let i in vm.totalData){
            vm.$set(vm.totalData[i],'titleShow',vm.totalData[i].institution+vm.totalData[i].title)
          }
        } else{
          console.log(res.msg)
        }
      })
    },
    //获取患者的医生团队
    getPatientTeam:function(){
      let vm = this
      $.post(vm.serverApi+"Patient/myDoctorTeam",{},function(res){
        if(res.code == 0){
          vm.totalData = res.data
          for(let i in vm.totalData){
            vm.$set(vm.totalData[i],'titleShow',vm.totalData[i].institution+vm.totalData[i].title)
          }
        } else{
          console.log(res.msg)
        }
      })
    },
    //显示预约表单
    showInviteBox:function(){
      let vm = this
      $('#invite-btn').css('display','none')
      $('#invite-box').css('display','block')
    },
    //显示预约按钮
    showInviteBtn:function(){
      let vm = this
      $('#invite-btn').css('display','block')
      $('#invite-box').css('display','none')
    },
    //邀请医生
    inviteDoctor:function(){
      let vm = this
      vm.submitFlag = true
      if(!vm.invitePhone){
        vm.alert('请填写手机号',false)
        return
      }
      if(vm.port !=3 && !vm.inviteEmail){
        vm.alert('请填写邮箱',false)
        return
      }
      let apiUrl = vm.port!=3?'Cases/inviteDoctor':'Cases/patientInviteDoctor'
      $.post(vm.serverApi+apiUrl,{
        caseId:vm.$route.params.caseId,
        serviceId:vm.$route.params.serviceId,
        name:vm.inviteName,
        phone:vm.invitePhone,
        email:vm.inviteEmail,
        content:vm.inviteContent,
      },function(res){
        if(res.code == 0){
          vm.alert('邀请成功',true)
          vm.showInviteBtn()
        } else{
          console.log('??')
          vm.alert('邀请失败',false)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  $orange: #fc9644 #838ade !default;
  $purple: #838ade;
  .team-detail {
    background-color: red;
    padding-left:25px;
    padding-right: 0;
    background-color:#eeeeee;
  }
  .more-case-team {
    padding: 0 5px 25px;
    background: #fff;
  }
  .more-case-team .panel-header {
    text-align: center;
    position: relative;
    font-weight: 300;
    line-height: 70px;
    padding: 0 20px;
    margin-bottom: 20px;
    font-size: 20px;
    color: #686868;
    letter-spacing: .33px;
  }
  .more-case-team .panel-header:after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 35%;
    width: 30%;
    border-bottom: 1px solid #a3b0bb;
  }
  .more-case-team .panel-body .items{
    // height: 250px;
    // overflow-y: auto;
    // overflow-x: hidden;
  }
  .more-case-team .panel-body .item {
    position: relative;
    height: 50px;
    padding: 9px 0 9px 40px;
  }
  .more-case-team .panel-body .item .avatar {
    position: absolute;
    left: 0;
    top: 9px;
    height: 32px;
    width: 32px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #979797;
    border-radius: 50%;
  }
  .more-case-team .panel-body .item .avatar img {
    width: 100%;
  }
  .item .line .base-info{
    padding-left: 0;
    line-height: 16px;
  }
  .item .line .base-info .name{
    text-align: left;
    font-weight: 700;
    font-size: 14px;
    color: #3c465a;
  }
  .item .line .base-info .title {
    text-align: left;
    font-size: 12px;
    color: #b1b1b1;
    letter-spacing: .34px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item .line .contact-icon{
    color: $purple;
    font-size: 18px;
  }
  .more-case-team .panel-body .divider-item {
    font-weight: normal;
    font-size: 16px;
    color: #333;
    letter-spacing: 0.4px;
    line-height: 30px;
    margin-top: 8px;
    margin-bottom: 12px;
  }
  .more-case-team .button {
    width: 70%;
    margin: 0 auto;
    display: block;
    font-size: 16px;
    background: #fff;
    color: nth($orange,1);
    border: 1px solid nth($orange,1);
  }
  .more{
    color: $purple;
    padding-right: 10px;
  }
  // 邀请
  .invite-box{
    padding: 10px 20px;
    .row{
      margin-bottom: 10px;
      input{
        height: 30px;
      }
      textarea{
        height: 80px;
      }
    }
    .button-box{
      padding-top: 20px;
      button{
        padding:3px 10px;
        width: 100%;
      }
    }
  }
</style>
