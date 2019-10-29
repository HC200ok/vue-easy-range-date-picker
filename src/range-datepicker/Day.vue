<template>
  <div class="day"
    :class="{'invalid': !item.valid, 'today': item.today, 'active': active, 'locked': locked, 'end': end, 'start': start}"
    @click="toggleDay"
    @mouseover="changeHoverDay">
      <div class="wrapper">
        <div class="circle">
          {{item.day}}
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    props: ['item', 'canHover', 'hoverDay', 'certainDays'],
    data: () => ({
      clicked: false
    }),
    methods: {
      toggleDay() {
        if (this.item.valid) {
          this.clicked = !this.clicked
          if (this.clicked || this.active || this.locked) {
            if (this.$parent.$parent.certainDays.length === 2) {
              this.$parent.$parent.certainDays = []
              this.$parent.$parent.hoverDay = null
            }
            this.$parent.$parent.certainDays.push(this.item.stamp)
          } else {
            this.$parent.$parent.certainDays.pop()
          }
        }
      },
      changeHoverDay() {
        if (this.canHover && this.item.valid && !this.active) {
          this.$parent.$parent.hoverDay = this.item.stamp
        }
      }
    },
    computed: {
      active() {
        return (this.certainDays.indexOf(this.item.stamp) !== -1
          && this.item.valid)
          || (this.item.stamp === this.hoverDay && this.item.valid)
      },
      start() {
        if (this.hoverDay && this.item.valid) {
          const certain = this.certainDays[0]
          const min = Math.min(certain, this.hoverDay)
          return this.item.stamp === min
        }
      },
      end() {
        if (this.hoverDay && this.item.valid) {
          const certain = this.certainDays[0]
          const max = Math.max(certain, this.hoverDay)
          return this.item.stamp === max
        }
      },
      locked() {
        if (this.hoverDay && this.item.valid) {
          const certain = this.certainDays[0]
          const min = Math.min(certain, this.hoverDay)
          const max = Math.max(certain, this.hoverDay)
          return this.item.stamp <= max && this.item.stamp >= min
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .day {
    margin-top: 10px;
    display: inline-block;
    width: 40px;
    text-align: center;
    font-size: 12px;
    color: #222;
    box-sizing: border-box;
    .wrapper {
      padding: 3px 0px;
    }
    .circle {
      line-height: 20px;
      text-align: center;
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
    }
    &.invalid {
      color: #999;
    }
    &.today {
      color: #1677d9;
    }
    &.active {
      color: #fff;
      .circle {
        background-color: #1677d9;
      }
    }
    &.locked {
      background-color: #e6f2ff;
    }
    &.end {
      background-color: #fff!important;
      padding-right: 6px;
      .wrapper {
        background-color: #e6f2ff;
        border-top-right-radius: 13px;
        border-bottom-right-radius: 13px;
        .circle {
          position: relative;
          right: -3px;
        }
      }
    }
    &.start {
      background-color: #fff!important;
      padding-left: 6px;
      .wrapper {
        background-color: #e6f2ff;
        border-top-left-radius: 13px;
        border-bottom-left-radius: 13px;
        .circle {
          position: relative;
          left: -3px;
        }
      }
    }
  }
</style>
