import dayjs from "dayjs";

export function calculateDifference(timeInMs) {
  const createdTime = dayjs(timeInMs)
  const nowTime = dayjs()
  
  if (createdTime.isBefore(nowTime) || createdTime.isSame(nowTime)) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }

  const padString = (time) => {
    return time < 10 ? '0' + time : time
  }

  return {
    days: padString(createdTime.diff(nowTime, 'day')),
    hours: padString(createdTime.diff(nowTime, 'hour') % 60),
    minutes: padString(createdTime.diff(nowTime, 'minute') % 60),
    seconds: padString(createdTime.diff(nowTime, 'second') % 60),
  }
}