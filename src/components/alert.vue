<template>
  <div class="alert-box" :class="{'alert-box-sucess':type=='success','alert-box-danger':type=='danger','active':isShow}" :id="id">
    <div class="alert-inner alert" :class="'alert-'+type">
      <span :class="'text-'+type">
        <i class="fa fa-check" aria-hidden="true" v-show="type=='success'"></i>
        <i class="fa fa-close" aria-hidden="true" v-show="type=='danger'"></i>
        {{text}}
      </span>
      <a class="close-btn" aria-hidden="true" v-show="!autoclose">&times;</a>
      <input type="hidden" :class="type" v-model="autoclose">
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      text: '',
      autoclose: true,
      id: "globalAlert",
      type: 'success',
      isShow: false,
    }
  },
  created: function() {},
  methods: {
    closeAlert: function() {
      var vm = this
      vm.isShow = false
    },
    showAlert: function(type) {
      var selector = '.' + type
      vm.isShow = true
      setTimeout(function() {
        vm.isShow = false
      }, 800)
    },
    showToast: function(type) {
      var vm = this
      vm.type = type
      vm.isShow = true
      if (vm.autoclose) {
        setTimeout(function() {
          // $('#'+vm.id).removeClass('active')
          vm.isShow = false
        }, 800)
      }
    }
  }
}
</script>
<style>
.alert-box {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /*background-color: rgba(0,0,0,.5);*/
  z-index: 99999999999999;
}

.alert-box.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-inner {
  /*background-color: rgba(0,0,0,.8);*/
  max-width: 300px;
  /*height: 90px;*/
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /*text-shadow: 1px 1px 0px #ccc;*/
  font-size: 16px;
  position: relative;
}

.close-btn,
.close-btn:hover {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ccc;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-decoration: none;
  cursor: pointer;
}
</style>
