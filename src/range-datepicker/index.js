import VueRangeDatePicker from './Picker'

VueRangeDatePicker.install = Vue => Vue.component(VueRangeDatePicker.name, VueRangeDatePicker);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueRangeDatePicker);
}

export default VueRangeDatePicker