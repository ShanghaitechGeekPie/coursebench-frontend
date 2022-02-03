import { inject, reactive } from "@vue/composition-api"

export default () => {

  const teacherDetail = inject("teacherDetail")

  const statics = {
    background: {
      SIST: '#b0c4de', 
      SPST: '#00a650',
      SLST: '#f39800',
      SCA: '#000000', 
      SEM: '#7d3c92', 
      GE: '#a40050', 
      BME: '#101f5b', 
      IMS: '#2800ae', 
      OTHER: '#dddddd'
    }
  }

  const status = reactive({

  })

  return { teacherDetail, statics, status }
}