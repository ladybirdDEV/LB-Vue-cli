<template>
  <div class="navbar-default sidebar" :class="{hide:($route.name =='Login' || $route.path.indexOf('change-password') != -1 || $route.path.indexOf('registered') != -1 || $route.path.indexOf('forget-password') != -1 || $route.name=='Document' || $route.name =='Log')}" role="navigation">
    <div class="title-icon">
        <a class="logo"><img src="static/logo_1.png" alt="logo"></a>
    </div>
    <div class="sidebar-nav navbar-collapse">
      <ul class="metismenu nav" id="menu">
        <li v-show="port == 2" :class="{ active: $route.name=='Home'}" @click="switchTab($event)">
          <a href="#/doctor" aria-expanded="true" role="button">
            <img v-show="$route.name != 'Home'" src="static/zhuye_p.png">
            <img v-show="$route.name == 'Home'" src="static/zhuye_y.png">
            <span>{{normalLanPack.dashboardTitle[lanIndex]}}</span>
          </a>
        </li>
        <li v-show="port == 2" :class="{ active: $route.path.indexOf('doctor/case') != -1 }" @click="switchTab($event)">
          <a href="#/doctor/case" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('doctor/case') == -1" src="static/anli_p.png">
            <img v-show="$route.path.indexOf('doctor/case') != -1" src="static/anli_y.png">
            <span>{{normalLanPack.caseTitle[lanIndex]}}</span>
          </a>
        </li>
        <li v-show="port == 2" :class="{ active: $route.path.indexOf('doctor/mypatients') != -1 }" @click="switchTab($event)">
          <a href="#/doctor/mypatients" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('doctor/mypatients') == -1" src="static/yonghu_p.png">
            <img v-show="$route.path.indexOf('doctor/mypatients') != -1" src="static/yonghu_y.png">
            <span>{{normalLanPack.patientsTitle[lanIndex]}}</span>
          </a>
        </li>
        <li v-show="port == 2" :class="{ active: $route.path.indexOf('doctor/video') != -1}" @click="switchTab($event)">
          <a href="#/doctor/video" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('doctor/video') == -1" src="static/shipin_p.png">
            <img v-show="$route.path.indexOf('doctor/video') != -1" src="static/shipin_y.png">
            <span>{{normalLanPack.videoTitle[lanIndex]}}</span>
          </a>
        </li>
<!--         <li v-show="port == 2" @click="switchTab($event)">
          <a aria-expanded="true" role="button">
            <i class="fa fa-users" aria-hidden="true"></i>
            <span>{{normalLanPack.communityTitle[lanIndex]}}</span>
          </a>
        </li> -->
        <li v-show="port == 3" :class="{ active: $route.name == 'patientHome' }" @click="switchTab($event)">
          <a href="#/patient" aria-expanded="true" role="button">
            <img v-show="$route.name != 'patientHome'" src="static/zhuye_p.png">
            <img v-show="$route.name == 'patientHome'" src="static/zhuye_y.png">
            <span>{{normalLanPack.dashboardTitle[lanIndex]}}</span>
          </a>
        </li>
        <li v-show="port == 3" :class="{ active: $route.path.indexOf('patient/mycase') != -1 }" @click="switchTab($event)">
          <a href="#/patient/mycase/basic" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('patient/mycase') == -1" src="static/bingli_p.png">
            <img v-show="$route.path.indexOf('patient/mycase') != -1" src="static/bingli_y.png">
            <span>{{normalLanPack.myMedical[lanIndex]}}</span>
          </a>
        </li>
        <li v-show="port == 3" :class="{ active: $route.path.indexOf('patient/myservice') != -1 }" @click="switchTab($event)">
          <a href="#/patient/myservice" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('patient/myservice') == -1" src="static/fuwu_p.png">
            <img v-show="$route.path.indexOf('patient/myservice') != -1" src="static/fuwu_y.png">
            <span>{{normalLanPack.myService[lanIndex]}}</span>
          </a>
        </li>
        <li  v-show="port == 1" :class="{ active: $route.path.indexOf('manager/order') != -1 || $route.path.indexOf('manager/service') != -1 }" @click="switchTab($event)">
          <a href="#/manager/order/waitingorder" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('manager/order') == -1" src="static/dingdan_p.png">
            <img v-show="$route.path.indexOf('manager/order') != -1" src="static/dingdan_y.png">
            <span>订单管理</span>
          </a>
        </li>
        <li  v-show="port == 1" :class="{ active: $route.path.indexOf('manager/patient') != -1 }" @click="switchTab($event)">
          <a href="#/manager/patient" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('manager/patient') == -1" src="static/yonghu_p.png">
            <img v-show="$route.path.indexOf('manager/patient') != -1" src="static/yonghu_y.png">
            <span>用户管理</span>
          </a>
        </li>
        <li  v-show="port == 1" :class="{ active: $route.path.indexOf('manager/doctor') != -1 }" @click="switchTab($event)">
          <a href="#/manager/doctor" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('manager/doctor') == -1" src="static/menzhen_p.png">
            <img v-show="$route.path.indexOf('manager/doctor') != -1" src="static/menzhen_y.png">
            <span>医生管理</span>
          </a>
        </li>
        <li v-show="port == 1" :class="{ active: $route.path.indexOf('manager/video') != -1}" @click="switchTab($event)">
          <a href="#/manager/video" aria-expanded="true" role="button">
            <img v-show="$route.path.indexOf('manager/video') == -1" src="static/shipin_p.png">
            <img v-show="$route.path.indexOf('manager/video') != -1" src="static/shipin_y.png">
            <span>视频会议</span>
          </a>
        </li>
        <!-- /语言选择 -->
        <li class="text-bottom">
          <span @click="changeLan($key)" role="button" v-for="(lan,$key) of normalLanPack.language">{{lan}}</span>
        </li>
        <!-- /语言选择 -->
      </ul>
    </div>
    <!--语言选择弹出框 -->

    <!-- /语言选择弹出框 -->
  </div>
</template>

<script>
  import mixins from '@/global/mixins'
  export default {
    mixins: [mixins],
    data() {
      return {
      }
    },
    created: function() {
      var vm = this
      //menu启动
      // $("#menu").metisMenu({
      //   toggle: false
      // });
    },
    methods:{
      //切换语言包方法
      changeLan:function(lanKey){
        var vm = this
        localStorage.lanIndex = lanKey
        vm.$store.commit('change'+lanKey)
      },
      //菜单切换时的样式变更
      switchTab:function(ev){
        switch(ev.target.nodeName){
          case 'A':
            $(ev.target).parent().addClass('active').siblings().removeClass('active')
            break
          case 'I':
            $(ev.target).parent().parent().addClass('active').siblings().removeClass('active')
            break
          case 'SPAN':
            $(ev.target).parent().parent().addClass('active').siblings().removeClass('active')
            break
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  $orange: #fc9644;
  $mainColor: #383449;
  $fontColor: #877fab;
  $dark: #332e46;
  .hide {
    display:none;
  }
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: $mainColor;
    .title-icon{
      height:100px;
      a{
        font-weight: bold;
        line-height:80px;
        color: #50d2c2;
        font-size:20px;
      }
    }
    @at-root{
      .navbar-collapse {
        padding-right: 0;
        padding-left: 0;
      }
    }
  }
  .sidebar ul>li.active a{
    padding-left: 30px;
    background-color: $dark;
  }
  .sidebar ul li.active a i{
    color: $orange;
  }
  .sidebar ul li.active a span{
    color: $orange;
  }
  .sidebar ul>li {
    margin-top: 0;
  }
  .nav {
    width: 200px;
    vertical-align: top;
    text-align:left;
  }
  .nav{
    li{
      height:50px;
      a{
        i{
          color: $fontColor;
          margin-left:0px;
          padding-left:0px;
          font-size:18px;
          vertical-align:bottom
        }
        img{
          margin-left: 20px;
          margin-bottom: 3px;
          width: 14px;
        }
        span{
          color: $fontColor;
          margin-left:10px;
          font-size:16px;
        }
        padding-left: 30px;
        &:focus, &:hover{
          background-color: $dark;
          i,span{
            color: $orange;
          }
        }
      }
    }
  }

  .text-bottom{
    width: 200px;
    position: absolute;
    left: 0;
    bottom: 0;
    line-height: 50px;
    text-align: center;
    span{
      color:$fontColor;
      padding-right: 3px;
      padding-left: 3px;
      font-size: 10px;
      border-right:1px $fontColor solid;
      &:last-child{
        border:none;
      }
      &:hover, &:focus{
        color:$orange;
      }
    }
  }
  // /*显示选择器*/
  // .text-bottom:hover a + .bottom-select{
  //   display:block;
  // }
</style>
