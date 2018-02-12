<template>
  <div class="calendar-box">
    <div class="time-box">
      <div class="time">
        {{ year }} <span>年</span>
        {{ month }} <span>月</span>
        {{ day }} <span>日</span>
        {{ hour }} <span>:</span>
        {{ minute }} <span>:</span>
        {{ second }}
      </div>
    </div>
    <div class="choice-box">
      <span> < </span>
      <div class="choice-month"></div>
      <span> > </span>
    </div>
    <keep-alve>
      <calendar :year="year" :month="month" :day="day"></calendar>
    </keep-alve>
  </div>
</template>

<script>
import calendar from './calendar'
export default {
  name:'vue-eb-calendar',
  data(){
    return{
      date:0,
      year:0,
      month:0,
      day:0,
      hour:0,
      minute:0,
      second:0
    }
  },
  component:{
    calendar,
  },
  methods:{
    time(){
      let _time = new Date();
      this.date = _time;
      this.year = _time.getFullYear();
      this.month = _time.getMonth() +1;
      this.day = _time.getDate();
      this.hour = _time.getHours()>9?_time.getHours():'0'+_time.getHours();
      this.minute = _time.getMinutes()>9?_time.getMinutes():'0'+_time.getMinutes();
      this.second = _time.getSeconds()>9?_time.getSeconds():'0'+ _time.getSeconds();
    }
  },
  mounted(){
    setInterval(()=>{
      this.time()
    },100);
  }
}
</script>

<style scoped>
*{
  font-family: "Microsoft YaHei","Source Han Sans CN","Helvetica Neue",Helvetica,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","WenQuanYi Micro Hei",Arial,sans-serif;
  user-select:none;
  -moz-user-select: none;
}

div{
  margin: 0;
  padding: 0;
}

.calendar-box{
  width: 350px;
  border-radius: 10px;
  border: 1px solid #CBCBCB;
  box-shadow: 0 0 5px #CBCBCB;
}

.time-box{
  width: 100%;
}

.time{
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
  font-size:14px;
}

.time span{
  font-size: 12px;
  margin: 0 1px;
  color: rgb(153, 152, 152);
}

.choice-box{
  width: 100%;
  border-top: 1px solid #CBCBCB;
  height:30px;
  line-height:30px;
}

.choice-month{

}
</style>
