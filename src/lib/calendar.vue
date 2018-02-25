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
                'choice-day':revDay(i.year,i.month,i.day,chioceDay)}"
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
    }
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
      this.toDay = {
        year:year,
        month:month,
        day,day
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

}

.week-day{
  width: 100%;
  margin-top: 5px;
}

.week-day span{
  display: inline-block;
  width: calc(100% / 7);
  line-height: 40px;
  height: 40px;
}

.week-day span div{
  width: 40px;
  margin: 0 auto;
}

.week-day span.to-day div{
  background: rgb(58, 249, 144);
  color: #FFF;
  border-radius: 4px;
}

.week-day span.choice-day div{
  background: rgb(58, 200, 249);
  color: #FFF;
  border-radius: 4px;
}
</style>
