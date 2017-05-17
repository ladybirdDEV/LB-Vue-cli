<template>
  <div class="pagination-bottom text-right">
    <button v-show="page>1" class="btn btn-default"  @click="prepage"><i class="glyphicon glyphicon-menu-left"></i></button>
    <button v-show="page == 1" class="btn btn-default disabled"><i class="glyphicon glyphicon-menu-left"></i></button>
    <span>{{page}}/{{totalpage}}</span>
    <button v-show="page<totalpage" class="btn btn-default" @click="nextpage"><i class="glyphicon glyphicon-menu-right"></i></button>
    <button v-show="page==totalpage" class="btn btn-default disabled"><i class="glyphicon glyphicon-menu-right"></i></button>
  </div>
</template>
<script>
  export default{
    props: ['page', 'totalpage', 'prepage', 'nextpage'],
  }
</script>
<style scoped lang="scss">
$purple:RGB(143,133,185);
  .pagination-bottom{
    padding:20px 35px;
    width: 100%;
    background-color: #fff;
    button{
      background-color: #fff;
      i{
        color: #AAAAAA;
      }
      &:hover{
        background-color: $purple;
        i{
          color: #fff;
        }
      }
    }
    span{
      font-size: 16px;
    }
  }
</style>
