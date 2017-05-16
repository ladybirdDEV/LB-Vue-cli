<template>
  <div class="select-box" :id="id+'SelectBox'">
    <input type="text" class="form-control" :id="id+'Text'" :placeholder="placeholder" v-model="value" @click="showList" @blur="hideList" @keyup="valueChanged($event)" autocomplete="off" v-if="!disabled">
    <input type="text" class="form-control" disabled="true" v-else>
    <div class="select-table select-list" v-if="showType=='table'" :id="id+'SelectBoxList'">
      <table>
        <tr v-if="datas=='' || datas.length==0 || datas == []">
          <td class="text-center">没有相关结果</td>
        </tr>
        <tr v-else v-for="(data,index) in datas" @click="select" @mouseover="hoverLi(index)" :class="{active:index==keyIndex}">
          <td class="img-box"><img :src="data.avatar"></td>
          <td v-if="lanIndex == 2">{{data.firstName}} {{data.lastName}}</td>
          <td v-else>{{data.lastName}} {{data.firstName}}</td>
        </tr>
      </table>
    </div>
    <ul v-else class="list-unstyled select-list" :id="id+'SelectBoxList'">
      <li v-if="datas=='' || datas.length==0 || datas == []" class="text-center">没有相关结果</li>
      <li v-else v-for="(i,inx) in datas" track- ="inx" @click="select" @mouseover="hoverLi(inx)" :class="{active:inx==keyIndex}">{{ i }}</li>
    </ul>
  </div>
</template>
<script>
import mixins from '@/global/mixins'
export default {
  props: ['get-data', 'datas', 'item-action', 'id', 'placeholder', 'show-type', 'disabled', 'defaultRow'],
  mixins: [mixins],
  data() {
    return {
      keyIndex: -1,
      mouseIndex: '',
      flag: true,
      textInput: '',
      valueCopy: '', //value的副本
      inputFlag: false, //区分是否是上下键带来的，还是输入后的回车
      inputStep: 0,
      firstShow: true,
      list: 'li', // 若showType=='table' list值为tr，否则值为'li'
      popDirectionDown: true,
      value:'',
    }
  },
  methods: {
    focus: function() {
      console.log($("#" + this.id + "Text"))
      $("#" + this.id + "Text").focus()
    },
    showList: function() {
      var vm = this
      vm.search()
    },
    popList: function() {
      var vm = this
      if (vm.firstShow && $('body>#' + vm.id + 'SelectBoxList').length == 0) {
        $('body').append($('#' + vm.id + 'SelectBox').find('.select-list'))
        $('#' + vm.id + 'SelectBox').find('.select-list').remove()
        vm.firstShow = false
      }
      vm.computePosition()
      $('#' + vm.id + 'SelectBoxList').css('opacity', '1')
      $('#' + vm.id + 'SelectBoxList').show()
      $('#' + vm.id + 'SelectBoxList').scrollTop(0)
      vm.keyIndex = 0
      vm.mouseIndex = 0
    },
    hideList: function() {
      var vm = this
      $('#' + vm.id + 'SelectBoxList').css('opacity', '0')
      setTimeout(function() {
        $('#' + vm.id + 'SelectBoxList').hide()
        $('#' + vm.id + 'SelectBoxList').scrollTop(0)
      }, 500)
    },
    select: function() {
      var vm = this
      console.log(vm.value)
      if ($('#' + vm.id + 'SelectBoxList').is(':visible')) {
        var index = vm.keyIndex
        vm.keyIndex = 0
        vm.itemAction(vm.popDirectionDown?index:vm.datas.length-1-index)
        vm.hideList()
        // vm.value = vm.valueCopy = ''
      }

    },

    valueChanged: function(event) {
      //this.showList()
      switch (event.keyCode) {
        case 38: //up
          this.inputFlag = false
          this.up()
          break
        case 40: //down
          this.inputFlag = false
          this.down()
          break
        case 13:
          if (!this.inputFlag) {
            this.select()
          }
          break
        default:
          this.inputFlag = true //reduce post too quick
          if (this.valueCopy != this.value) {
            this.inputStep++;
            var vm = this
            var tempStep = vm.inputStep
            setTimeout(function() {
              if (vm.inputStep == tempStep) {
                vm.search()
                vm.inputFlag = false
              }
            }, 150)
            this.valueCopy = this.value
          }
          break
      }
    },

    search: function() {
      var vm = this
      this.getData()
      $('#' + vm.id + 'SelectBoxList').addClass('active')
      vm.popList()
    },

    computePosition: function() {
      var vm = this
      var $input = $('#' + vm.id + 'Text')
      var top = ''
      var bottom = ''

      var left = $input.offset().left
        // $('body').height($(document).height())
      if ($(window).height() - ($input.offset().top - $(window).scrollTop()) - 34 > 200) {
        // 输入框下面显示
        top = $input.offset().top + 34
        bottom = 'auto'
        vm.popDirectionDown = true
      } else {
        // 输入框上面面显示
        top = 'auto'
        bottom = $(window).height() - $input.offset().top
        vm.popDirectionDown = false
      }
      $('body>#' + vm.id + 'SelectBoxList').css({
        top: top,
        right: 'auto',
        bottom: bottom,
        left: left,

        width: $input.width() + 24
      })
    },

    /* 绑定键盘上下键 */
    hoverLi: function(index) {
      var vm = this
      if (vm.flag) {
        vm.keyIndex = index
        vm.mouseIndex = index
      } else {
        return
      }
    },
    up: function(event) {
      var vm = this
      var id = '#' + vm.id + 'Text'
      if ($(id).is(':focus')) {
        vm.flag = false
        if (vm.keyIndex > 0) {
          vm.keyIndex--
          $('#' + vm.id + 'SelectBoxList').scrollTop($('#' + vm.id + 'SelectBoxList').scrollTop() - 26)
        }
        vm.flag = true
      }
    },
    down: function(event) {
      var vm = this
      var id = '#' + vm.id + 'Text'
      if ($(id).is(':focus')) {
        vm.flag = false
        if (vm.keyIndex < $('#' + vm.id + 'SelectBoxList').find(vm.list).length - 1) {
          vm.keyIndex++
          if (vm.keyIndex > 0) {
            $('#' + vm.id + 'SelectBoxList').scrollTop($('#' + vm.id + 'SelectBoxList').scrollTop() + 26)
          }
        }
        vm.flag = true
      }
    }
  },
  ready: function() {
    var vm = this
    $('body>#' + vm.id + 'SelectBoxList').remove()
    vm.list = vm.showType == 'table' ? 'tr' : 'li'
  },
  filters: {
    checkReverse: function(array) {
      if (!array.length) {
        return array
      }
      var temp = $.extend([],array)
      let vm = this
      let focusIndex = 0
      if (!vm.popDirectionDown) {
        temp.reverse()
        focusIndex = array.length - 1
        vm.keyIndex = focusIndex
      }
      setTimeout(function() {
        if(!vm.popDirectionDown){
          $('#' + vm.id + 'SelectBoxList').scrollTop(10000)
        }
      }, 10)

      return temp
    }
  },
}
</script>
<style scoped lang="scss">
.select-list,
.select-table {
  background-color: #eee;
  position: absolute;
  top: 34px;
  left: 0;
  max-height: 200px;
  overflow: auto;
  margin-bottom: 0;
  display: none;
}

.select-list>li {
  padding: 3px 12px;
  font-size: 14px;
}

.select-table table {
  width: 100%;
  tr{
    .img-box{
      width: 60px;
      height: 60px;
      img{
        border:2px #fff sold;
        width: 58px;
      }
    }
  }
}

.select-list>li:hover,
.select-table tr:hover {
  background-color: #ccc;
  cursor: pointer;
}

.select-list>li.active,
.select-table tr.active {
  background-color: #666;
  color: #fff;
}
</style>
<style>
  .select-list,
  .select-table {
    z-index:1051;
  }
</style>
