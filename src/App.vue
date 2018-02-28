<template>
  <div id="app">
    {{ test }}
    <vue-eb-calendar
    :value-date="valueDate"
    :to-day="toDay"
    @on-clone = "isShowFun"
    :date-show="isShow"
    :yearMax='max'
    :yearMin='min'
    @output ="output($event)"
    ></vue-eb-calendar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      valueDate:true,
      toDay:true,
      isShow:true,
      max:2050,
      min:1990,
      test:''
    }
  },
  methods:{
    isShowFun(){
      this.isShow = false;
    },
    output(val){
      this.test = val;
    }
  }
}
</script>

<style>

</style>
