<template>
  <div>
    <div class="calendar-box">
      <div class="day-box">
        <div class="day" v-for='day in days' :key='day'>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:'vue-eb-calendar',
  data(){
    return{
      date:'',
    }
  },
  methods:{

  }
}
</script>

<style scoped>
div{
  margin: 0;
  padding: 0;
}

.calendar-box{
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid #CBCBCB;
  box-shadow: 0 0 5px #CBCBCB;
}

.day-box{
  width: 100%;
  margin-top: 19px;
  height: 100px;
  border-top: 1px solid #CBCBCB;
}
</style>
