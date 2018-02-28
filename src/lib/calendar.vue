<template>
<div class="app">
  <div class="week-box">
    <span v-for="(item,index) in week_list" :key="index">
      {{ item }}
    </span>
  </div>
  <div class="day-box">
    <div class="week-day"
    v-for="(item,index) in selections"
    :key="index">
      <span v-for="(i,ind) in item" :key="ind"
      :class="{ 'to-day':revDay(i.year,i.month,i.day,toDay),
                'choice-day':revDay(i.year,i.month,i.day,chioceDay),
                'not-month':!i.in}"
      @click="chioceDayFn(i.year,i.month,i.day)"
      >
        <div>{{ i.day }}</div>
      </span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    isToDay:{
      type:null
    },
    year:{
      type:Number,
    },
    month:{
      type:Number,
    },
    day:{
      type:Number,
    },
    selections:{
      type:Array
    },
  },
  data(){
    return{
      week_list:['日','一','二','三','四','五','六'],
      chioceDay:{},
      isOne:true,
      toDay:{}
    }
  },
  watch:{
    day(val,oldVal){
      this.initDay(this.year,this.month,this.day);

      if(this.isOne){
        this.initToDay(this.year,this.month,this.day);
        this.isOne = false;
      }
    }
  },
  methods:{
    initDay(year,month,day){ //设置当前选择的日期
      this.chioceDay = {
        year:year,
        month:month,
        day:day
      }
    },
    revDay(year,month,day,obj){ // 匹配选择的日期
      let isTo = false;
      if( day == obj.day &&
          month == obj.month &&
          year == obj.year){
        isTo = true;
      }

      return isTo;
    },
    chioceDayFn(year,month,day){
      this.$emit('on-change',{
        day:day,
        month:month,
        year:year
      });
    },
    // 返回今天的日期对象
    initToDay(year,month,day){
      if(this.isToDay){
        this.toDay = {
          year:year,
          month:month,
          day,day
        }
      }
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.app{
  font-family: "Microsoft YaHei","Source Han Sans CN","Helvetica Neue",Helvetica,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","WenQuanYi Micro Hei",Arial,sans-serif;
  user-select:none;
  overflow: hidden;
}

.week-box{
  margin-top:10px;
  height: 30px;
}

.week-box span{
  display: inline-block;
  width: calc(100% / 7);
  font-weight: bold;
}

.day-box{
  margin-top: 2px;
}

.day-box:last-child{
  margin-bottom: 2px;
}

.week-day{
  width: 100%;
}

.week-day span{
  display: inline-block;
  width: calc(100% / 7);
  height: 40px;
  padding: 3px 0;
  box-sizing:border-box;
  line-height: 34px;
}

.week-day span.not-month{
  background: rgb(214, 214, 214);
  color: #999;
}

.week-day span div{
  width: 34px;
  height: 34px;
  margin: 0 auto;
}

.week-day span.to-day div{
  background: rgb(143, 221, 250);
  color: #FFF;
  border-radius: 4px;
}

.week-day span.choice-day div{
  background: rgb(58, 200, 249);
  color: #FFF;
  border-radius: 4px;
}
</style>
