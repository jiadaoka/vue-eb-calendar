<template>
  <div class="calendar-box" v-show="isShow">
    <div class="time-box">
      <div class="div-content">
        <div class="calendar-cloce" v-if="isValueDate" @click="calendarCloce">
          <span>X</span>
        </div>
        <div class="time" v-if="istoDay">
          {{ year }} <span>年</span>
          {{ month }} <span>月</span>
          {{ day }} <span>日</span>
          {{ hour }} <span>:</span>
          {{ minute }} <span>:</span>
          {{ second }}
        </div>
      </div>
    </div>
    <div class="choice-box">
      <div class="div-content">
        <span class="month-last" :class="{hover:!this.banLast}" @click="monthLast()"> &lt; </span>
        <span class="month-next" :class="{hover:!this.banNext}" @click="monthNext()"> &gt; </span>
        <div class="choice-month">
          <div class="choice-nav">
            <eb-select
            :selections="month_list"
            :value="num_month"
            @on-change="valueCorr('num_month',$event)"
            ></eb-select>
          </div>
          <div class="choice-nav">
            <eb-select
            :selections="year_list"
            :value="num_year"
            @on-change="valueCorr('num_year',$event)"
            ></eb-select>
          </div>
        </div>
      </div>
    </div>
    <div class="day-box">
      <div class="div-content">
        <keep-alive>
          <calendar :year="num_year" :month="num_month" :day="num_day" :selections="day_list"
          :isToDay="istoDay"
          @on-change="chioceToDay($event)"></calendar>
        </keep-alive>
      </div>
    </div>
    <div class="foot-box">
      <div class="foot-butt" @click="calendarCloce" v-if="isValueDate"></div>
    </div>
  </div>
</template>

<script>
import calendar from './calendar'
import ebSelect from './components/select'
export default {
  name:'vue-eb-calendar',
  props:{
    valueDate:{
      default:true,
      type:Boolean,
      required:false
    },
    toDay:{
      default:true,
      type:Boolean,
      required: false
    },
    dateShow:{
      default:true,
      type:Boolean,
      required:false
    },
    yearMax:{
      type:Number,
      required:false
    },
    yearMin:{
      type:Number,
      required:false
    }
  },
  data(){
    return{
      date:0,
      year:0,
      month:0,
      day:0,
      hour:0,
      minute:0,
      second:0,
      month_list:[1,2,3,4,5,6,7,8,9,10,11,12],
      num_month:0,
      year_list:[],
      num_year:0,
      day_list:[],
      num_day:0,
      isShow:this.dateShow,
      banLast:false,
      banNext:false
    }
  },
  computed:{
    isValueDate(){
      return this.valueDate;
    },
    istoDay(){
      return this.toDay;
    }
  },
  watch:{
    num_year(){
      this.day_list = this.initDay();
    },
    num_month(){
      this.day_list = this.initDay();
    },
    dateShow(){
      this.isShow = this.dateShow;
      this.initToDay();
    },
    yearMax(){
      this.initYearList();
    },
    yearMin(){
      this.initYearList();
    }
  },
  components:{
    calendar,
    ebSelect
  },
  methods:{
    initDay(){
      let _dayList = [];
      let _monthEnd = new Date(this.num_year,this.num_month,0).getDate(),         // 这个月共多少天
          _monthEndWeek = new Date(this.num_year,this.num_month,0).getDay(),      // 月末是周几
          _monthStartWeek = new Date(this.num_year,this.num_month-1,1).getDay();  // 月头是周几

      // 跑一个临时的月份数组
      let _tempWeek = _monthStartWeek;
      let n = 0;
      _dayList.push([]);
      for(let i=0;i<_monthEnd;i++){

        let _tempDay = {
          year:this.num_year,
          month:this.num_month,
          day:i+1,
          in:true
        }
        _dayList[n].push(_tempDay);

        if(i != _monthEnd-1 && (_tempWeek+1+i)%7==0){
          _dayList.push([]);
          n++;
        }
      }

      // 补月头非周日时所缺天数
      if(_monthStartWeek != 0){
        let _lastDate = new Date(this.num_year,this.num_month-1,0);
        let _lastMonthEnd = _lastDate.getDate(),
            _lastYear = _lastDate.getFullYear(),
            _lastMonth = _lastDate.getMonth()+1;

        for(let i=0;i<_monthStartWeek;i++){
          let _tempDay = {
            year:_lastYear,
            month:_lastMonth,
            day:_lastMonthEnd-i,
            in:false
          };
          _dayList[0].unshift(_tempDay);
        }
      }

      // 补月末非周六时所缺天数
      if(_monthEndWeek != 6){
        let _nextDate = new Date(this.num_year,this.num_month,1);
        let _nextYear = _nextDate.getFullYear(),
            _nextMonth = _nextDate.getMonth()+1;

        for(let i=0;i<6-_monthEndWeek;i++){
          let _tempDay = {
            year:_nextYear,
            month:_nextMonth,
            day:1+i,
            in:false
          };
          _dayList[_dayList.length-1].push(_tempDay);
        }
      }

      return _dayList;
    },
    time(){
      let _time = new Date();
      this.date = _time;
      this.year = _time.getFullYear();
      this.month = _time.getMonth() +1;
      this.day = _time.getDate();
      this.hour = _time.getHours()>9?_time.getHours():'0'+_time.getHours();
      this.minute = _time.getMinutes()>9?_time.getMinutes():'0'+_time.getMinutes();
      this.second = _time.getSeconds()>9?_time.getSeconds():'0'+ _time.getSeconds();
    },
    valueCorr(val,ev){

      this[val] = ev;
    },
    initYearList(){
      let _max = !!this.yearMax;
      let _min = !!this.yearMin;
      let _isMax,_yearMin,_yearMax;

      this.year_list = [];

      if(_max && _min){
        if(this.yearMax > this.yearMin){
          _yearMin = this.yearMin;
          _yearMax = this.yearMax;
        }else{
          let _time = new Date().getFullYear();
          _yearMin = _time -24;
          _yearMax = _time +25;
        }
      }else if(_max && !_min){
        _yearMax = this.yearMax;
        _yearMin = this.yearMax - 49;
      }else if(!_max && _min){
        _yearMin = this.yearMin;
        _yearMax = this.yearMin + 49;
      }else if(!_max && !_min){
        let _time = new Date().getFullYear();
        _yearMin = _time -24;
        _yearMax = _time +25;
      }

      for(let i = _yearMin;i<=_yearMax;i++){
        this.year_list.push(i);
      }
    },
    monthLast(){
      if(this.num_year > this.yearMin){
        if(this.num_month<2){
          this.num_year--;
          this.num_month = 13;
        }
        this.num_month--;
      }else if(this.num_year == this.yearMin){
        if(this.num_month>=2){
          this.num_month--;
        }else{
          this.banLast = true;
        }
      }else{
        this.num_year = this.yearMin;
        this.num_month = 1;
      }
    },
    monthNext(){
      if(this.num_year < this.yearMax){
        if(this.num_month>11){
          this.num_year++;
          this.num_month = 0;
        }
        this.num_month++;
      }else if(this.num_year == this.yearMax){
        if(this.num_month<=11){
          this.num_month++;
        }else{
          this.banNext = true;
        }
      }else{
        this.num_year = this.yearMax;
        this.num_month = 12;
      }
    },
    chioceToDay(data){
      this.num_year = data.year;
      this.num_month = data.month;
      this.num_day = data.day;
      this.outputDate();
    },
    calendarCloce(){
      this.$emit('on-clone');
    },
    initToDay(){
      let _time = new Date();
      this.num_month = _time.getMonth() +1;
      this.num_year = _time.getFullYear();
      this.num_day = _time.getDate();

      this.day_list = this.initDay();
    },
    outputDate(){
      let _date = this.num_year + '-' +this.num_month+'-'+this.num_day;
      this.$emit('output',_date);
    }
  },
  mounted(){
    this.initToDay();
    this.initYearList();

    setInterval(()=>{
      this.time()
    },100);
  }
}
</script>

<style scoped>
.calendar-box{
  font-family: "Microsoft YaHei","Source Han Sans CN","Helvetica Neue",Helvetica,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","WenQuanYi Micro Hei",Arial,sans-serif;
  user-select:none;
  width: 290px;
  border-radius: 10px;
  border: 1px solid #CBCBCB;
  box-shadow: 0 0 5px #CBCBCB;
}

div{
  margin: 0;
  padding: 0;
}

.time-box{
  width: 100%;
  height: 30px;
}

.div-content{
  width: 280px;
  margin: 0 auto;
}

.time{
  height: 30px;
  line-height: 30px;
  font-size:14px;
}

.time span{
  font-size: 12px;
  margin: 0 1px;
  color: rgb(153, 152, 152);
}

.calendar-cloce{
  float: right;
  line-height: 30px;
  color: rgb(153, 152, 152);
  margin-right:10px;
}

.calendar-cloce:hover{
  font-weight: bold;
}

.choice-box{
  width: 100%;
  border-top: 1px solid #CBCBCB;
  height:30px;
  line-height:30px;
  text-align: center;
}

.month-last,
.month-next{
  display: inline-block;
  width:20%;
  height: 100%;
}

.hover:hover{
  background: rgb(230, 230, 230);
}

.month-last{
  float: left;
}

.month-next{
  float: right;
}

.choice-month{
  width: 50%;
  margin: 0 auto;
}

.choice-nav{
  width: 50%;
  height: 30px;
  float: left;
}

.day-box{
  border-top: 1px solid #D4D4D4;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.foot-box{
  border-top: 1px solid #cccccc;
  width: 100%;
  margin: 0 auto;
  height: 30px;
  overflow: hidden;
}

.foot-butt{
  width: 100%;
  height:30px;
}

.foot-butt:hover{
  box-shadow: 0 0 3px #000 inset;
  border-bottom-right-radius:10px;
  border-bottom-left-radius:10px;
}

</style>
