import vueEbCalendar from './vue-eb-calendar'

const calendar = {
  install(Vue,options){
    Vue.prototype.$ebOpt = {};
    Vue.component(vueEbCalendar.name,vueEbCalendar);
  }
}
if(typeof window !== "undefined" && window.Vue){
  window.Vue.use(calendar);
}

export default calendar
