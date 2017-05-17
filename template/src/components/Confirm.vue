<template>
	<div id="globalConfrim" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog  modal-sm">
	    <div class="modal-content">
	      <!-- <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	        <h4>{{ title }}</h4>
	      </div> -->
	      <div class="modal-body">
          <div class="text-center">
            <img src="static/emark.png">
            <!-- <p>{{text}}</p> -->
            <p>{{msg}}</p>
          </div>
	      </div>
	      <div class="modal-footer">
          <div class="text-center">
            <button class="btn btn-default" data-dismiss="modal" aria-hidden="true" @click="cancel">取消</button>
  	        <button class="btn btn-red" data-dismiss="modal" aria-hidden="true" @click="click">确定</button>
          </div>
	      </div>
	    </div>
	    <!-- /.modal-content -->
	  </div>
	  <!-- /.modal -->
	</div>
</template>

<script>
  import mixins from '@/global/mixins'
	export default {
		mixins: [mixins],
    props:['msg']
    data: function(){
      return {
        title:'',
        text:'',
        method: function(){},
        cancelMethod: function(){},
      }
    },
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
.modal-dialog{
  width: 300px;
  .modal-content{
    border-radius: 3px;
    .modal-body{
      height: 200px;
      img{
        margin-top: 25px;
        height: 90px;
      }
      p{
        font-weight: bold;
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .modal-footer {
      border-top: none;
    }
    .btn-default{
      background-color: #CCC !important;
      color:#fff !important;
      border-color: #CCC !important;
      font-size: 18px;
      padding: 3px 35px;
    }
    .btn-red{
      background-color: RGB(255,94,94) !important;
      color:#fff !important;
      border-color: RGB(255,94,94) !important;
      font-size: 18px;
      padding: 3px 35px;
    }
  }


}
</style>
