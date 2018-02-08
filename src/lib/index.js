import vueEbCalendar from './vue-eb-calendar'

const calendar = {
  install(Vue,options){
    Vue.component(vueEbCalendar.name,vueEbCalendar)
  }
}

export default calendar
