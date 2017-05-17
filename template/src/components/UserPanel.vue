<template>
  <div class="panel" :class="{'b-purple':bcolor==1,'b-blue':bcolor==2}">
    <div class="panel-heading">
      <div class="title col-lg-9">
        <slot name="title"></slot>
      </div>
      <div class="tools col-lg-3 text-right">
        <slot name="tools"></slot>
      </div>
    </div>
    <div class="panel-body">
      <div class="avatar col-lg-3 col-md-5 col-sm-5 col-xs-5">
        <slot name="avatar"></slot>
      </div>
      <div class="content col-lg-9 col-md-7 col-sm-7 col-xs-7 text-left">
        <div class="name">
          <slot name="name"></slot>
        </div>
        <div class="info">
          <slot name="info"></slot>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:['bcolor'],
}
</script>
<style scoped lang="scss">
$danger:RGB(255,127,127);
$gray: RGB(212,203,248);
$purple:RGB(143,133,185);
$blue:RGB(106,139,200);
.panel {
  // background-color: $blue;
  .panel-heading{
    padding:1px 5px;
    .tools{
      padding: 0;
      color: $gray;
      a{
        color: $gray;
      }
    }
  }
  .panel-body {
    padding: 4px;
    padding-left: 10px;
    .avatar {
      padding: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border:2px #fff solid;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content {
      padding: 0;
      padding-left: 10px;
      color: #fff;
      .name{
        font-size: 16px;
        padding-bottom: 10px;
        p{
          width: 100%;
          text-overflow:ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .info{
        font-size: 10px;
        p{
          width: 100%;
          text-overflow:ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      p{
        padding: 0;
        margin: 0;
      }
    }
  }
  .panel-footer {
    display: flex;
    text-align: center;
    background-color: #fff;
    color:$gray;
    font-size: 16px;
  }
}
a{
  text-decoration: none;
}
.b-blue{
  background-color: $blue;
}
.b-purple{
  background-color: $purple;
}
</style>
