<template>
<div class="app">
  <div class="select-title" @click="toggleShow">
    {{ selections[nowIndex] }}
  </div>
  <div class="select_list" v-show="isShow">
    <ul>
      <li
      v-for="(item,index) in selections"
      :key="item"
      :class="{li_active:index === nowIndex}"
      @click="chooseSelection(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  props:{
    selections:{
      type:null,
      required: true
    },
    value:{
      type:null
    }
  },
  data(){
    return{
      nowIndex:0,
      isShow:false,
      isNoe:true,
      Hscroll:10
    }
  },
  methods:{
    initSelect(){
      if(this.value){
        let lengthSelections = this.selections.length;
        for(let i = 0;i<lengthSelections;i++){
          if(this.value == this.selections[i]){
            this.nowIndex = i;
          }
        }
      }
    },
    chooseSelection(index){
      this.nowIndex = index
      this.isDrop = false
      this.$emit('on-change',this.selections[index]);
      this.isShow = false;
    },
    toggleShow(){
      this.isShow = !this.isShow;
    },
    initList(num){
      let _Hscroll = (num-4)*30;
      let _Bscroll = (this.selections.length-10)*30;
      if(_Hscroll<0){
        _Hscroll = 0;
      }else if(_Hscroll > _Bscroll){
        _Hscroll = _Bscroll;
      }

      return _Hscroll;
    }
  },
  watch:{
    value(val,oldval){
      this.initSelect();
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
  width: 100%;
  max-width: 300px;
  position: relative;
  font-weight: bold;
}

ul,div{
  padding: 0;
  margin: 0;
}

.select-title{
  width: 100%;
  height: 30px;
}

.select_list{
  border: 1px solid #e3e3e3;
  max-height: 360px;
  overflow-y: auto;
  background: #fff;
}

.select_list li{
  list-style: none;
}

.li_active,
.select-title:hover,
.select_list li:hover{
	background: rgb(58, 200, 249);
  color: #FFF;
}

</style>

