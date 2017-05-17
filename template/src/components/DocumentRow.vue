<template>
  <div class="item">
    <div class="row">
      <div class="item-date" :class="'bc'+item[lanIndex].type">
        <div class="date-month">{{normalLanPack.monthTitle[lanIndex][item['1']['reportTime'].substring(5,7)]}}</div>
        <div class="date-day">{{item[lanIndex]['reportTime'].substring(8,10)}}</div>
      </div>
      <div class="item-name">
        <span class="text-left">{{item[lanIndex]['title']?item[lanIndex]['title']:"&nbsp"}}</span>
        <div class="ctrl-group text-right">
          <i v-if="item[lanIndex]['attachments'].length==1" @click="openAttachmentLink(item[lanIndex]['attachments'][0].url)">
            <img role="button" v-show="item[lanIndex].type == 1" src="/static/ico_yiyuan2.png">
            <img role="button" v-show="item[lanIndex].type == 2" src="/static/ico_huayan2.png">
            <img role="button" v-show="item[lanIndex].type == 3" src="/static/ico_yingxiang2.png">
            <img role="button" v-show="item[lanIndex].type == 4" src="/static/ico_bingli2.png">
            <img role="button" v-show="item[lanIndex].type == 5" src="/static/ico_yiyuan2.png">
          </i>
          <i>
            <img src="/static/ico_other2.png" role="button" @click="openDocumentWindow({title:item[lanIndex]['title'],content:item[lanIndex]['content'],date:item[lanIndex]['reportTime']})">
          </i>
          <i class="fa fa-angle-down pointer" aria-hidden="true" v-if="item[lanIndex]['attachments'].length>1" @click="toggle"></i>
        </div>
      </div>
    </div>
    <div class="row" v-if="item[lanIndex]['attachments'].length>1&&toggleShow">
      <div class="item-date">
      </div>
      <div class="item-name" style="padding-left: 10px;">
        <div class="row ctrl-oteher-group text-left">
        <div v-for="attachment in item[lanIndex]['attachments']" class="col-md-2 column">
          <i class="fa fa-file-text-o pointer" aria-hidden="true" @click="openAttachmentLink(attachment.url)"></i>
          <p>{{ attachment.name }}</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@/global/mixins'
export default {
  mixins: [mixin],
  props: ['item'],
  data: function() {
    return {
      toggleShow: false
    }
  },
  methods: {
    toggle: function() {
      let vm = this
      vm.toggleShow = (vm.toggleShow == false)
    }
  }
}
</script>
<style scoped lang="scss">
.item {
  padding-left:15px;
  margin-bottom: 20px;
  .row{
    /*height: 50px;*/
    width: 665px;
    .item-date {
      float:left;
      width: 50px;
      height: 50px;
      margin-right: 15px;
      color: #fff;
      padding-top: 5px;
      padding-left: 0;
      padding-right: 0px;
      .report {
        background-color: #986399;
      }
      .lab {
        background-color: #ecb147;
      }
      .date-month {
        font-size: 12px;
      }
      .date-day {
        font-size: 21px;
      }
    }
    .item-name {
      float:left;
      width: 600px;
      line-height: 50px;
      height: 100%;
      background-color: #f8f8f8;
      span {
        float:left;
        width: 500px;
        font-size: 16px;
        padding-left: 15px;
        background-color: #f8f8f8;
      }
      .ctrl-group {
        float:left;
        width: 100px;
        background-color: #f8f8f8;
        font-size: 30px;
        padding-right: 10px;
        i {
          color: #50d2c2;
          font-weight: 100;
        }
      }
      .ctrl-oteher-group{
        padding-bottom: 10px;
        font-size: 80px;
        padding-right: 10px;
        i {
          color:#8080bc !important;
          font-weight: 100;
          margin-left:5px;
        }
        p {
          font-size: 14px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
//日期背景颜色
.bc1 {
  background-color: #ff93b5;
}

.bc2 {
  background-color: #85cdc9;
}

.bc3 {
  background-color: #5ebfee;
}

.bc4 {
  background-color: #90DA84;
}

.bc5 {
  background-color: #ff9f5a;
}
.fa-angle-down{
  color:#8080bc !important;
}
</style>
