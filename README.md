# vue-easy-range-date-picker

> A simple and easy-to-use range date picker based on Vue2

# Installation

```bash
npm install --save vue-easy-range-date-picker
```

# Usage
```js
<template>
  <RangeDatePicker v-model="dates"/>
</template>

<script>
import RangeDatePicker from 'vue-easy-range-date-picker';

export default {
  components: {
    RangeDatePicker,
  },
  data() {
    return {
      dates: {
        start: 1572879600000,
        end:  1575730800000
      },
    };
  },
}
</script>
```

# Demo
<img src="./images/demo.png" width="650px"/>

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dates-with-start-and-end-kgm6v?file=/src/App.vue)

# Props
| Props                | Type         | Required | Default     |
| ---------------------| -------------| -------- | ------------|
| v-model(1)           | Object       | yes      | null        |
| language(2)          | String       | no       | 'zh'        |
| colorToday(3)        | String       | no       | '#41b883'   |
| colorSelected(3)     | String       | no       | '#34495e'   |
| colorActive(3)       | String       | no       | '#41b883'   |

(1) v-model: Binding an object which contains start timestamp and end timestamp: 
```js
// example
dates: { 
  start: 1573052400000,
  end: 1574434800000
}
```
you can also pass an empty object as the default value like this:
```js
<template>
  <RangeDatePicker v-model="dates"/>
</template>

<script>
import RangeDatePicker from 'vue-easy-range-date-picker';

export default {
  components: {
    RangeDatePicker,
  },
  data() {
    return {
      dates: {},
    };
  },
}
</script>
```

<img src="./images/demo-empty-dates.png" width="650px"/>

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/initial-empty-dates-wso98o?file=/src/App.vue)

(2) Now supporting Chinese('zh'), Japanese('jp'), English('en')

(3)

<img src="./images/color.png" width="650px"/>

# Event

`closePicker` event will be emitted when both the start date and end date are selected.

# Build Setup
``` bash
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
```


