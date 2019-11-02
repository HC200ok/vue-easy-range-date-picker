export function parseTime(time, format = 'y-m-d h:i:s') {
    if (!time && time !== 0) {
      return '0000-00-00 00:00:00'
    }
  
    const date = time instanceof Date ? time : new Date(parseInt(time, 10))
  
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
  
    return format.replace(/(y|m|d|h|i|s|a)+/gi, (match, p1) => {
      p1 = p1.toLowerCase()
      let value = formatObj[p1]
  
      if (match.length > 0 && value < 10) {
        value = `0${value}`
      }
  
      return value || (p1 === 'y' ? '0000' : '00')
    })
  }