<template>
  <div class="panel" :class="{'danger': state==1, 'blue': state==2, 'green': state==3, 'gray': state==4}">
    <div class="panel-body">
      <div class="flex-box">
        <div class="panel-title">
          <slot name="title"></slot>
        </div>
        <div class="panel-tools">
          <slot name="tools"></slot>
        </div>
      </div>
      <div class="panel-content">
        <slot name="content">
        </slot>
      </div>
    </div>
    <div class="panel-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:['state'],
}
</script>
<style scoped lang="scss">
$danger:RGB(255,127,127);
$gray:RGB(112, 112, 112);
$blue:RGB(78, 173, 239);
$green:RGB(100, 191, 149);
$lightGray:RGB(254,226,226);
.panel{
  background-color:$danger;
  .panel-body {
    padding: 5px 10px;
    color:white;
    text-align:left;
    .flex-box {
      display: flex;
      justify-content:space-between;
      .panel-title {
        padding-top: 3px;
        flex: 3;
        font-size: 13px;
      }
      .panel-tools {
        flex: 1;
        text-align: right;
        span{
          background-color: #EEEEEE;
          color: #AAAAAA;
        }
      }
    }
  }
  .panel-content {
    padding: 10px 10px;
    line-height:10px;
    p{
      font-size: 15px;
    }
    .bottom-show {
      padding:0px;
    }
  }
  .panel-footer {
    display: flex;
    text-align: center;
    padding-bottom:10px;
    font-size: 16px;
  }
}
.danger{
  background-color:$danger;
}
.gray{
  background-color:$gray;
}
.blue{
  background-color:$blue;
}
.green{
  background-color:$green;
}
.cdanger{
  color:$danger;
}
.cgray{
  color:$gray;
}
.cblue{
  color:$blue;
}
.cgreen{
  color:$green;
}

</style>
