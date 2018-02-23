<template>
<div class="app">
  <div class="week_box">
    <span v-for="(item,index) in week_list" :key="index">
      {{ item }}
    </span>
  </div>
  <div class="day_box">
    <div class="week_day"
    v-for="(item,index) in selections"
    :key="index">
      <span v-for="(i,ind) in item" :key="ind"
      :class="{nowDay:i.day == day}"
      >
        {{ i.day }}
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
      week_list:['日','一','二','三','四','五','六']
    }
  }
}
</script>

<style scoped>
.app{
  font-family: "Microsoft YaHei","Source Han Sans CN","Helvetica Neue",Helvetica,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","WenQuanYi Micro Hei",Arial,sans-serif;
  user-select:none;
  overflow: hidden;
}

.week_box{
  margin-top:10px;
  height: 30px;
}

.week_box span{
  display: inline-block;
  width: calc(100% / 7);
  font-weight: bold;
}

.day_box{

}

.week_day{
  width: 100%;
  margin-top: 5px;
}

.week_day span{
  display: inline-block;
  width: calc(100% / 7);
}

.week_day span.nowDay{
  background: rgb(58, 200, 249);
  color: #FFF;
}
</style>
