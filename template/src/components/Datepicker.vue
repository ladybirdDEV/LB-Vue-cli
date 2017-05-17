<template>
  <div class="input-group date datepicker" :id = "id + 'div'" data-provide="datepicker" data-date-format="yyyy-mm-dd" data-date-autoclose="true" data-date-language="zh-CN" data-date-today-highlight="true" data-date-week-start="0">
    <slot>
      <input type="text" class="form-control" :id="id" :placeholder="placeholder" v-model="datevalue" @keyup="formitValue($event)">
      <div class="input-group-addon">
        <span class="glyphicon glyphicon-th"></span>
      </div>
    </slot>
  </div>
</template>
<script>
import mixin from "@/global/mixins"
export default {
  name: 'datepicker',
  mixins: [mixin],
  props: ['placeholder', 'value'],
  data() {
    return {
      datevalue: '',
      id: '',
    }
  },
  created: function() {
    var vm = this
    vm.id = vm.guidGenerator()
  },
  mounted: function() {
    const vm = this
    $("#"+vm.id+'div').datepicker().on('changeDate', function(e) {
      vm.datevalue = vm.date(e.date,$("#"+vm.id+'div').data('dateFormat'))
    })
  },
  methods: {
    formitValue: function(event) {
      var vm = this
      if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39)) {
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
          vm.datevalue = vm.datevalue.replace(/[^\d-]/g, '')
          return
        }
      }
      if (event.keyCode != 8) {
        if (vm.datevalue.length == 4 || vm.datevalue.length == 7) {
          vm.datevalue += '-'
        }
        if (vm.datevalue.length > 10) {
          vm.datevalue = vm.datevalue.substring(0, 10)
        }
      }
    },
  },
  //使用watch模拟双向绑定
  watch: {
    datevalue: function(newValue, oldValue) {
      let vm = this
      vm.$emit('input', newValue)
    },
    value: function(newValue, oldValue) {
      let vm = this
      vm.datevalue = newValue
    },
  }
}
</script>
