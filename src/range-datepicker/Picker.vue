<template>
  <div class="picker">
    <div class="dates-wrapper">
      <date
        :year="leftYear"
        :month="leftMonth"
        :canNextMonth="canNextMonth"
        :canNextYear="canNextYear"
        :canHover="canHover"
        :certainDays="certainDays"
        :hoverDay="hoverDay"
        :language="language"
        :colorToday="colorToday"
        :colorSelected="colorSelected"
        :colorActive="colorActive"
        @prevYear="leftPrevYear"
        @nextYear="leftNextYear"
        @prevMonth="leftPrevMonth"
        @nextMonth="leftNextMonth"></date>
      <date
        :year="rightYear"
        :month="rightMonth"
        :canPrevMonth="canPrevMonth"
        :canPrevYear="canPrevYear"
        :canHover="canHover"
        :certainDays="certainDays"
        :hoverDay="hoverDay"
        :language="language"
        :colorToday="colorToday"
        :colorSelected="colorSelected"
        :colorActive="colorActive"
        @prevYear="rightPrevYear"
        @nextYear="rightNextYear"
        @prevMonth="rightPrevMonth"
        @nextMonth="rightNextMonth"></date>
    </div>
  </div>
</template>

<script>
  import date from './Date'
  export default {
    name: "VueRangeDatePicker",
    components: {
      date
    },
    props: {
      value: {
        type: Object,
        default: null,
      },
      language: {
        type: String,
        default: "zh"
      },
      colorToday: {
        type: String,
        // default: "#1677d9"
        default: "#41b883"
      },
      colorSelected: {
        type: String,
        // default: "#1677d9"
        default: "#34495e"
      },
      colorActive: {
        type: String,
        // default: "#e6f2ff"
        default: "#41b883"
      }
    },
    data: () => ({
      leftYear: new Date().getFullYear(),
      leftMonth: new Date().getMonth(),
      rightYear: new Date().getFullYear(),
      rightMonth: new Date().getMonth() + 1,
      certainDays: [],
      hoverDay: null
    }),
    computed: {
      selected() {
        return this.certainDays.length === 2
      },
      canHover() {
        return this.certainDays.length === 1
      },
      canPrevMonth() {
        return this.rightYear > this.leftYear
          || this.rightMonth - this.leftMonth > 1
      },
      canPrevYear() {
        return this.rightYear > this.leftYear
      },
      canNextMonth() {
        return this.leftYear < this.rightYear
          || this.rightMonth - this.leftMonth > 1
      },
      canNextYear() {
        return this.rightYear > this.leftYear
      }
    },
    methods: {
      leftNextYear() {
        this.leftYear += 1
      },
      leftNextMonth() {
        if (this.leftMonth === 11) {
          this.leftMonth = 0
          this.leftYear += 1
        } else {
          this.leftMonth += 1
        }
      },
      leftPrevYear() {
        this.leftYear -= 1
      },
      leftPrevMonth() {
        if (this.leftMonth === 0) {
          this.leftMonth = 11
          this.leftYear -= 1
        } else {
          this.leftMonth -= 1
        }
      },
      rightNextYear() {
        this.rightYear += 1
      },
      rightNextMonth() {
        if (this.rightMonth === 11) {
          this.rightMonth = 0
          this.rightYear += 1
        } else {
          this.rightMonth += 1
        }
      },
      rightPrevYear() {
        this.rightYear -= 1
      },
      rightPrevMonth() {
        if (this.rightMonth === 0) {
          this.rightMonth = 11
          this.rightYear -= 1
        } else {
          this.rightMonth -= 1
        }
      }
    },
    watch: {
      certainDays(val) {
        if (val.length === 2) {
          this.$emit('closePicker')
          this.$emit('input', {
            start: Math.min(...val),
            end: Math.max(...val)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .picker {
    background-color: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    width: 641px;
    margin: 0px auto;
    .dates-wrapper {
      display: flex;
      border-top: 1px solid #e6e6e6;
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background-color: #e6e6e6;
        position: absolute;
        left: 320px;
        top: 0px;
      }
    }
  }
</style>

