<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div class="range-date-picker-container">
      <transition name="panelIn">
        <vue-range-date-picker
          class="range-date-picker"
          language="jp"
          v-model="dates"
          v-show="show"
          @closePicker="closePicker"></vue-range-date-picker>
      </transition>
      <input
        class="range-date-input"
        @click="showPicker"
        placeholder="click to use vue-range-datepicker"
        :value="rangeDates"/>
    </div>
  </div>
</template>

<script>
// import VueRangeDatePicker from '../dist/vueRangeDatePicker.js'
import VueRangeDatePicker from './range-datepicker/Picker'
import { parseTime } from './util.js'

export default {
  name: 'app',
  data () {
    return {
      msg: 'vue-range-datepicker',
      show: false,
      dates: {}
    }
  },
  methods: {
    parseTime,
    closePicker() {
      this.show = false
    },
    showPicker() {
      this.show = true
    }
  },
  computed: {
    rangeDates() {
      if (Object.keys(this.dates).length === 2) {
        return `${this.parseTime(this.dates.start, 'y-m-d')}  -  ${this.parseTime(this.dates.end, 'y-m-d')}`
      } else {
        return ""
      }
    }
  },
  components: {
    VueRangeDatePicker
  }
}
</script>

<style lang="scss">
.range-date-picker-container {
  cursor: pointer;
  font-size: 14px;
  position: relative;
  .range-date-picker {
    position: absolute;
    top: 50px;
    left: 0px;
  }
  .range-date-input {
    padding: 10px;
    width: 300px;
  }
}
.panelIn-enter {
  transform: translateY(-10px);
}
.panelIn-enter-active {
  transition: transform 0.3s ease;
}
.panelIn-enter-to {
  transform: translateY(0);
}
</style>
