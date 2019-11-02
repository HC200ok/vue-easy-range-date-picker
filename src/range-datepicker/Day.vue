<template>
  <div class="day"
    :class="{'invalid': !item.valid, 'today': item.today, 'selected': selected, 'active': active, 'end': end, 'start': start}"
    @click="toggleDay"
    @mouseover="changeHoverDay"
    :style="{color: dayColor, backgroundColor: dayBackgroundColor}">
      <div class="wrapper" :style="wrapperStyleObject">
        <div class="circle" :style="{backgroundColor: circleBackgroundColor}">
          {{item.day}}
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        default: null,
      },
      canHover: {
        type: Boolean,
        default: false
      },
      hoverDay: {
        type: Number
      },
      certainDays: {
        type: Array
      },
      colorToday: {
        type: String
      },
      colorSelected: {
        type: String
      },
      colorActive: {
        type: String
      }
    },
    data: () => ({
      clicked: false
    }),
    methods: {
      toggleDay() {
        if (this.item.valid) {
          this.clicked = !this.clicked
          if (this.clicked || this.selected || this.active) {
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
        if (this.canHover && this.item.valid && !this.selected) {
          this.$parent.$parent.hoverDay = this.item.stamp
        }
      }
    },
    computed: {
      selected() {
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
      active() {
        if (this.hoverDay && this.item.valid) {
          const certain = this.certainDays[0]
          const min = Math.min(certain, this.hoverDay)
          const max = Math.max(certain, this.hoverDay)
          return this.item.stamp <= max && this.item.stamp >= min
        }
      },
      dayColor() {
        if (this.selected) {
          return "#fff"
        } else if (this.active) {
          return "#222"
        } else if (this.item.today) {
          return this.colorToday
        } else if (!this.item.valid) {
          return "#999"
        } else {
          return "#222"
        }
      },
      circleBackgroundColor() {
        return this.selected ? this.colorSelected : ""
      },
      wrapperBackgroundColor() {
        return this.end || this.start ? this.colorActive : ""
      },
      dayBackgroundColor() {
        return this.active && !this.selected ? this.colorActive : ""
      },
      wrapperBorderTopLeftRadius() {
        if (this.selected) {
          return this.end ? "" : "13px"
        } else {
          return ""
        }
      },
      wrapperBorderBottomLeftRadius() {
        if (this.selected) {
          return this.end ? "" : "13px"
        } else {
          return ""
        }
      },
      wrapperBorderTopRightRadius() {
        if (this.selected) {
          return this.start ? "" : "13px"
        } else {
          return ""
        }
      },
      wrapperBorderBottomRightRadius() {
        if (this.selected) {
          return this.start ? "" : "13px"
        } else {
          return ""
        }
      },
      wrapperStyleObject() {
        return {
          backgroundColor: this.wrapperBackgroundColor,
          borderTopLeftRadius: this.wrapperBorderTopLeftRadius,
          borderBottomLeftRadius: this.wrapperBorderBottomLeftRadius,
          borderTopRightRadius: this.wrapperBorderTopRightRadius,
          borderBottomRightRadius: this.wrapperBorderBottomRightRadius,
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
    &.end {
      padding-right: 6px;
      .circle {
        position: relative;
        right: -3px;
      }
    }
    &.start {
      padding-left: 6px;
      .circle {
        position: relative;
        left: -3px;
      }
    }
  }
</style>
