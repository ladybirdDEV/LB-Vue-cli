<template>
  <div class="form-group" >
    <div class="input-group date" id='datetimepicker3'>
      <input type='text' class="form-control" :placeholder="placeholder" v-model="datevalue">
      <span class="input-group-addon">
        <span class="glyphicon glyphicon-time"></span>
      </span>
    </div>
  </div>
</template>

<script>
import mixin from "@/global/mixins"
export default {
  mixins: [mixin],
  props: ['id', 'placeholder', 'value', ],
  data() {
    return {
      datevalue: '',
    }
  },
  created: function() {
      var datetime = new Date(),
      year = datetime.getYear() + 1900,
      month = datetime.getMonth() + 1,
      day = datetime.getDate(),
      hour = datetime.getHours(),
      min = datetime.getMinutes(),
      now = year + '-' + month + '-' + day + ' ' + hour + ':' + min
  },
  methods: {

  },
  computed: {

  },
  mounted: function() {
    let vm = this
    var picker2 = $('#datetimepicker3').datetimepicker({
      format: 'HH:mm'
    })
    picker2.on('dp.change', function(e) {
      let time = vm.date(e.date,$("#datetimepicker3").data('dateFormat'))
      vm.datevalue = time.substring(16, 21)
    })
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
