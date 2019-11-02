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
        @click="showPicker"/>
    </div>
  </div>
</template>

<script>
import VueRangeDatePicker from './range-datepicker/Picker'

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
    closePicker() {
      this.show = false
    },
    showPicker() {
      this.show = true
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
    top: 36px;
    left: 0px;
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
