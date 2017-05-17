<template>
  <div>
    <div class="nav-container">
      <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0;">
        <div class="container-fluid">
          <div class="navbar-header">
            <div v-if="($route.params.caseId && $route.path.indexOf('create') == -1) || $route.params.patientId" class="from-inline">
              <div class="back">
                <span class="back-arrow"><a role="button" @click="$router.go(-1)">&lt; {{normalLanPack.back[lanIndex]}}</a></span>
                <span v-if="lanIndex == 1" class="case-title">{{patient.lastName}} {{patient.firstName}}</span>
                <span v-else class="case-title">{{patient.firstName}} {{patient.lastName}}</span>
              </div>
            </div>
            <h2 v-else>{{normalLanPack[titleType][lanIndex]}}</h2>
          </div>
          <ul class="nav navbar-nav navbar-right">
<!--            <li class="dropdown">
             <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-search ic" aria-hidden="true"></i></a>
           </li>
           <li class="dropdown">
             <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-pencil-square-o ic" aria-hidden="true"></i></a>
           </li>
           <li class="dropdown">
             <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-envelope-o ic" aria-hidden="true"></i></a>
           </li> -->
            <li class="dropdown">
              <a v-if="lanIndex == 1" href="#" class="dropdown-toggle" data-toggle="dropdown">
                <span class="my-name">{{userInfo['lastName']}} {{userInfo['firstName']}}</span>
                <span class="caret"></span>
              </a>
              <a v-else href="#" class="dropdown-toggle" data-toggle="dropdown">
                <span class="my-name">{{userInfo['firstName']}}{{userInfo['lastName']}}</span>
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li>
                  <div class="message-header">
                    <div class="author-img col-lg-3 col-md-4 col-sm-4 col-xs-4">
                      <img :src="userInfo['avatar']">
                    </div>
                    <div class="author-info col-lg-9 col-md-8 col-sm-8 col-xs-8 text-left">
                      <div v-show="lanIndex == 1" class="name">{{userInfo['lastName']}} {{userInfo['firstName']}}</div>
                      <div v-show="lanIndex == 2" class="name">{{userInfo['firstName']}}{{userInfo['lastName']}}</div>
                      <!-- <div class="date">2017-09-18 12:12:02</div> -->
                    </div>
                  </div>
                  <div class="personal-info">
                    <button class="btn btn-primary" @click="showPersonalInfo">{{normalLanPack.personalInfo[lanIndex]}}</button>
                  </div>
                </li>
                <li role="button"  @click="changePassword">{{normalLanPack.changePassword[lanIndex]}}</li>
                <!-- <li role="button">{{normalLanPack.sendFeedback[lanIndex]}}</li> -->
                <li role="button" class="text-left"><a @click="loginOut">{{normalLanPack.signOut[lanIndex]}}</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="row text-right title-bottom">
          <p>{{normalLanPack.techTel[lanIndex]}}: (+86)185-0251-0668</p>
          <p>{{normalLanPack.serviceTel[lanIndex]}}: (+86)138-1396-9977</p>
        </div>
      </nav>
    </div>
    <doctor-info :id="doctorInfo"></doctor-info>
  </div>
</template>

<script>
  import doctorInfo from '@/components/doctorInfo'
  import mixins from '@/global/mixins'
  export default{
    mixins: [mixins],
    components:{doctorInfo},
    props: ['titleType','patient'],
    data() {
      return {
        doctorInfo:"doctorInfo",
        userInfo:[],
      }
    },
    created: function() {
      var vm = this
      //从Vuex中获取用户信息
      vm.userInfo = vm.$store.state.userInfo
    },
    methods:{
      //显示个人详细信息
      showPersonalInfo:function(){
        $('#doctorInfo').css('display','block')
      },
      //登出
      loginOut: function(){
        let vm = this
        $.cookie('gc_user_info', '', { expires: -1 });
        vm.$router.push({name:'Login'})
      },
      changePassword: function(){
        let vm = this
        vm.$router.push({name:'ForgetPassword'})
      }
    }
  }
</script>
<style scoped lang="scss">
  $orange:#fc9644;
  .nav-container{
    height:105px;
    margin-left: 200px;
    .navbar-default{
      padding: 10px 25px 0px 25px;
      height:100%;
      border-color:#fff;
      background-color: #fff;
      .container-fluid{
        height: 55px;
        padding-left: 25px;
        .navbar-header{
          height:100%;
          .back{
            padding-top: 10px;
            .back-arrow{
              font-size:19px;
              a{
                color: #333;
                text-decoration:none;
              }
            }
          }
          .case-title{
            margin-left:10px;
            font-size:30px;
          }
          h2{
            margin-top: 15px;
          }
        }
        .navbar-nav>li>a {
          li{
            a{
              padding:15px 10px 0px 10px;
              @at-root.ic{
                font-size:19px;
                color: $orange;
              }
              @at-root.my-name{
                font-size:18px;
                color: $orange;
              }
            }
          }
        }
      }
      .title-bottom{
        padding-right:30px;
        height:30px;
        p{
          font-size:10px;
          color:#BBBBBB;
          margin:0;
        }
      }
      //选项卡样式
      .case-tabs{
        padding-left:25px;
        height:45px;
        .nav-tabs {
          border-bottom: none;
          li{
            @at-root.active{
              box-shadow: 0px 4px 0px #52cbbb;
            }
            a{
              color: #333;
              font-size: 16px;
              &:hover{
                background-color:#fff;
                border: none;
              }
            }
          }
        }
      }
    }
  }

  .nav-tabs>li.active>a{
    color: #333;
    background-color: #fff;
    border:none;
  }

  .dropdown-menu{
    width: 250px;
    padding: 25px;
    li{
      line-height: 20px;
      a{
        padding:0;
      }
    }
  }
  .message-header {
    height:50px;
    position: relative;
  }
  .message-header .author-img {
    padding: 0;
    margin:0;
  }
  .message-header .author-img img{
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .message-header .author-info{
    padding:0;
  }
  .message-header .author-info .name{
    font-weight: bold;
    font-size: 15px;
  }
  .message-header .author-info .date{
    font-size: 10px;
    color:#888888;
  }
  .personal-info{
    text-align: center;
    padding-bottom: 20px;
    border-bottom:1px #eeeeee solid;
    button{
      font-size: 13px;
      padding-top:0;
      padding-bottom: 0;
      border-radius: 1px;
    }
  }


  //个人信息侧边栏
  .right-personinfo{
    display:none;
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
    .image{
      padding: 50px 0px;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border:2px $orange solid;
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
      margin-top: 100px;
      border-radius: 1px;
      height: 30px;
      line-height: 10px;
    }
  }
</style>
