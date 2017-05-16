<template>
  <div>
    <div class="nav-container">
      <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0;">
        <div class="container-fluid">
          <div class="navbar-header">
            <span class="back-arrow" v-show="hasBack"><a role="button" @click="$router.go(-1)">&lt; {{normalLanPack.back[lanIndex]}}</a></span>
            <span class="case-title">{{normalLanPack[titleType][lanIndex]}}</span>
          </div>
          <ul class="nav navbar-nav navbar-right">
<!--             <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-search ic" aria-hidden="true"></i></a>
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
                <li role="button" @click="changePassword">{{normalLanPack.changePassword[lanIndex]}}</li>
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
    <personal-info :id="personInfo"></personal-info>
  </div>
</template>

<script>
  import mixins from '@/global/mixins'
  import personalInfo from '@/components/personalInfo'
  export default{
    mixins: [mixins],
    props: ['titleType','hasBack'],
    components:{personalInfo},
    data() {
      return {
        personInfo:'personInfo',
        imageUrl:'',
        userInfo:[],
      }
    },
    created: function() {
      let vm = this
      vm.userInfo = vm.$store.state.userInfo
    },
    methods:{
      //显示个人详细信息
      showPersonalInfo:function(){
        $("#personInfo").css('display','block')
      },
      //登出
      loginOut: function(){
        let vm = this
        //清除userinfo
        $.cookie('gc_user_info', '', { expires: -1 });
        vm.$router.push({name:'Login'})
      },
      //修改密码
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
    margin-left: 200px;
    height:105px;
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
          padding-top: 15px;
          .back-arrow{
            font-size:19px;
            a{
              color: #333;
              text-decoration:none;
            }
          }
          .case-title{
            margin-left:10px;
            font-size:30px;
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
    }
  }

  .dropdown-menu{
    width: 250px;
    padding: 25px;
    li{
      line-height: 20px;
      a{
        padding: 0;
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

</style>
