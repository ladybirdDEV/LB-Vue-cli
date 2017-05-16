<template>
  <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4>{{ title }}</h4>
        </div>
        <div class="modal-body" v-html="text">
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" @click="click">确认</button>
          <button class="btn" data-dismiss="modal" aria-hidden="true" @click="cancel">取消</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
  </div>
</template>

<script>
  export default {
    props: [ 'id', 'title', 'text', 'method', 'cancelMethod'],
    methods: {
      click: function() {
        this.method()
      },
      cancel: function() {
        if(typeof this.cancelMethod == 'function') {
          this.cancelMethod()
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .modal-header{
    background-color: #32424e;
    height: 50px;
    color: #fff;
    button{
      color: #fff;
    }
    h4{
      margin-top: 0px;
    }
  }
  .modal-body{
    padding: 40px 40px;
    padding-bottom: 10px;
    font-size: 20px;
  }
  .modal-footer{
    border-top:none;
  }
  .modal-footer button{
    width: 100px;
    font-size: 18px;
  }
</style>
