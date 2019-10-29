<template>
  <div class="date-picker">
    <div class="main">
      <div class="head">
        <div class="side">
          <div class="prev-year year"
            v-if="canPrevYear"
            @click="prevYear" >
              <div class="icon prev"></div>
              <div class="icon prev"></div>
          </div>
          <div class="prev-month month"
            v-if="canPrevMonth"
            @click="prevMonth">
              <div class="icon prev"></div>
          </div>
        </div>
        <div class="text">
          {{year}}年{{month + 1}}月
        </div>
        <div class="side">
          <div class="next-month month"
            v-if="canNextMonth"
            @click="nextMonth">
              <div class="icon next"></div>
          </div>
          <div class="next-year year"
            v-if="canNextYear"
            @click="nextYear" >
              <div class="icon next"></div>
              <div class="icon next"></div>
          </div>
        </div>
      </div>
      <div class="weeks">
        <span
          class="week"
          v-for="(item, i) in weeks[lang]"
          :key="i">
            {{item}}
        </span>
      </div>

      <div class="days">
        <day 
          v-for="item in days"
          :key="item.stamp"
          :item="item"
          :canHover="canHover"
          :certainDays="certainDays"
          :hoverDay="hoverDay"></day>
      </div>
    </div>
  </div>
</template>

<script>
  import day from './Day'
  export default {
    props: {
      certainDays: {
        type: Array
      },
      hoverDay: {
        type: Number
      },
      year: {
        type: Number
      },
      month: {
        type: Number
      },
      canNextMonth: {
        type: Boolean,
        default: true
      },
      canNextYear: {
        type: Boolean,
        default: true
      },
      canPrevMonth: {
        type: Boolean,
        default: true
      },
      canPrevYear: {
        type: Boolean,
        default: true
      },
      canHover: {
        type: Boolean,
        default: false
      },
      lang: {
        default: "zh"
      }
    },
    data: () => ({
      days: [],
      weeks: {
        'zh': ["日", "一", "二", "三", "四", "五", "六"],
        'jp': ["日", "月", "火", "水", "木", "金", "土"],
        'en': ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      }
    }),
    components: {
      day
    },
    methods: {
      firstDay() {
        const date = new Date(this.year, this.month, 1)
        const temp = date.setDate(1)
        return new Date(temp)
      },
      isToday(date) {
        const today = new Date()
        return date.getFullYear() === today.getFullYear()
          && date.getMonth() === today.getMonth() 
          && date.getDate() === today.getDate()
      },
      getDayCountOfMonth(year, month) {
        if (month === 3 || month === 5 || month === 8 || month === 10) {
          return 30
        }
        if (month === 1) {
          if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            return 29
          } else {
            return 28
          }
        }
        return 31
      },
      prevDays() {
        const firstDay = this.firstDay()
        if (firstDay.getDay() === 0) return []
        const count = this.getDayCountOfMonth(this.year, this.month - 1)
        const date = new Date(this.year, this.month - 1, count)
        const nums = date.getDay() + 1
        const days = []
        for (let i = 0; i < nums; i++) {
          const day = {
            stamp: +new Date(this.year, this.month - 1, count - i),
            day: count - i,
            valid: false,
            today: false
          }
          days.unshift(day)
        }
        return days
      },
      currentDays() {
        const vm = this
        const count = vm.getDayCountOfMonth(vm.year, vm.month)
        const days = []
        for (let i = 0; i < count; i++) {
          const date = new Date(vm.year, vm.month, i + 1)
          const day = {
            stamp: +date,
            day: i + 1,
            valid: true,
            today: vm.isToday(date)
          }
          days.push(day)
        }
        return days
      },
      nextDays() {
        const firstDay = this.firstDay()
        if (firstDay.getDay === 6) return []
        const count = this.getDayCountOfMonth(this.year, this.month)
        const lastDay = new Date(this.year, this.month, count)
        const remain = 6 - lastDay.getDay()
        const days = []
        for (let i = 0; i < remain; i++) {
          const day = {
            stamp: +new Date(this.year, this.month + 1, i + 1),
            day: i + 1,
            valid: false,
            today: false
          }
          days.push(day)
        }
        return days
      },
      getDays() {
        const days = []
        const prevDays = this.prevDays()
        const currentDays = this.currentDays()
        const nextDays = this.nextDays()
        return days.concat(prevDays).concat(currentDays).concat(nextDays)
      },
      nextMonth() {
        this.$emit('nextMonth')
      },
      prevMonth() {
        this.$emit('prevMonth')
      },
      nextYear() {
        this.$emit('nextYear')
      },
      prevYear() {
        this.$emit('prevYear')
      }
    },
    created() {
      this.days = this.getDays()
    },
    watch: {
      year() {
        this.days = this.getDays()
      },
      month() {
        this.days = this.getDays()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .date-picker {
    width: 320px;
    margin: 0 auto;
    .main {
      width: 280px;
      margin: 0 auto;
    }
    .days {
      padding-bottom: 32px;
    }
    .head {
      padding-bottom: 20px;
      padding-top: 20px;
      display: flex;
      align-items: center;
      .text {
        flex-grow: 1;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
      }
      .side {
        width: 49px;
        height: 20px;
        flex-shrink: 0;
        position: relative;
        .year {
          display: flex;
          cursor: pointer;
          position: absolute;
          top: 1px;
          padding: 5px;
          &.next-year {
            right: 3px;
            .icon {
              &:nth-child(1) {
                position: relative;
                right: -1px;
              }
            }
          }
          &.prev-year {
            left: 3px;
            .icon {
              &:nth-child(2) {
                position: relative;
                left: -1px;
              }
            }
          }
        }
        .month {
          cursor: pointer;
          position: absolute;
          top: 1px;
          padding: 5px;
          &.next-month {
            right: 42px;
          }
          &.prev-month {
            left: 42px;
          }
        }
        .icon {
          width: 7px;
          height: 7px;
          border-left: 1px solid #222;
          border-bottom: 1px solid #222;
          &.prev {
            transform: rotate(45deg);
          }
          &.next {
            transform: rotate(-135deg);
          }
        }
      }
    }
    .weeks {
      display: flex;
      padding-bottom: 10px;
      border-bottom: 1px dashed #e6e6e6;
      .week {
        display: inline-block;
        text-align: center;
        width: 40px;
        color: #222;
        font-size: 12px;
      }
    }
  }
</style>

