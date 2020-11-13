<template>
  <div class="calendar">
    <Button @click="switchWeek">切换周日位置</Button><br><br>
    <Button @click="switchDateMore">切换显示首尾日期</Button><br><br>
    <Button @click="isShowlunar = !isShowlunar">是否显示农历</Button>
    <div>
      <span @click="switchMonth('upper')">上</span>&nbsp;
      <span>{{dateFormat(date,'YYYY-MM')}}</span>&nbsp;
      <span @click="switchMonth('lower')">下</span>&nbsp;
      <span @click="buildDayList(new Date())">今日</span>
    </div>
    <div class="week">
      <p v-for="(item,index) in weekList"
         :style="{width:`${100/7}%`}"
         :key="index">{{item}}</p>
    </div>
    <ul>
      <li v-for="(item,index) in dayList"
          :class="{'now':dateFormat(new Date()) === dateFormat(item.date)}"
          :key="index"
          :style="{width:`${100/7}%`}">
        <p> {{dateFormat(item.date,'D')}}</p>
        <p v-if="isShowlunar"> {{calendarFormat(item.date)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
import { calendar } from '@utils/calendar'
const weekListA = [
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周日'
]
const weekListB = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
]
export default {
  name: '',

  data() {
    return {
      weekList: weekListA,
      holiday: {
        '1-1': '元旦',
        '3-12': '植树节',
        '4-5': '清明节',
        '5-1': '国际劳动节',
        '5-4': '青年节',
        '6-1': '国际儿童节',
        '8-1': '建军节',
        '10-1': '国庆节',
        '12-24': '平安夜',
        '12-25': '圣诞节'
      },
      date: new Date(),
      dayList: [],
      weekType: false,
      isMoreDate: false,
      isShowlunar: false
    }
  },

  mounted() {
    this.buildDayList()
  },

  methods: {
    dateFormat(v, format = 'YYYY-MM-DD') {
      return v ? moment(v).format(format) : ''
    },
    calendarFormat(date) {
      if (!date || !this.isShowlunar) return ''
      const _date = new Date(date)
      const year = _date.getFullYear()
      const month = _date.getMonth() + 1
      const day = _date.getDate()
      let _lunar = calendar.solar2lunar(year, month, day)
      return _lunar.lDay === 30 && _lunar.lMonth === 12 ? '除夕' : _lunar.lDay === 1 && _lunar.lMonth === 1 ? '春节' : _lunar.Term ? _lunar.Term : _lunar.lDay === 1 ? `${_lunar.IMonthCn}` : `${_lunar.IDayCn}`
    },
    switchWeek() {
      this.weekType = !this.weekType
      this.weekList = this.weekType ? weekListB : weekListA
      this.switchMonth()
    },
    switchDateMore() {
      this.isMoreDate = !this.isMoreDate
      this.switchMonth()
    },
    switchMonth(type) {
      let year = Number(this.date.getFullYear())
      let month = Number(this.date.getMonth() + 1)
      if (type === 'upper') {
        if (month > 1) {
          month--
        } else {
          year--
          month = 12
        }
      } else if (type === 'lower') {
        if (month < 12) {
          month++
        } else {
          year++
          month = 1
        }
      }
      this.date = new Date(year, month, 0)
      this.buildDayList()
    },
    buildDayList(date = null) {
      this.dayList = []
      const year = (date || this.date).getFullYear()
      const month = (date || this.date).getMonth() + 1
      // 一个月的天数
      const days = Number(new Date(year, month, 0).getDate())
      // 月份的第一天是星期几
      const week = Number(new Date(`${year}/${month}/1`).getDay())
      // 周日显示在前面还是后面
      const front = this.weekType ? week : week ? week - 1 : 6
      // 后面天数取余数
      const behind = (days + front) % 7 ? 7 - (days + front) % 7 : 0
      // 沾满所有格子所需的天数 加上前面和后面的天数
      const allDays = days + front + behind
      // 显示上/下个月 判断跨年
      const _year = month === 1 ? year - 1 : month === 12 ? year + 1 : year
      // 上个月 月份 等于一月  返回12月
      const frontMonth = (month === 1 ? 12 : month - 1)
      // 下个月 月份 等于12月 返回一月
      const behindMonth = (month === 12 ? 1 : month + 1)
      // 上个月天数 - 本月星期 然后 += 1
      let frontDays = Number(new Date(_year, frontMonth, 0).getDate()) - front
      // 下个月天数 直接+=1
      let behindDays = 0
      for (let i = 0; i < allDays; i++) {
        if (i < front) { // 上个月日期
          this.dayList.push({
            date: this.isMoreDate ? new Date(`${_year}/${frontMonth}/${frontDays += 1}`) : ''
          })
        } else if (i < (days + front)) { // 当月日期
          this.dayList.push({
            date: new Date(`${year}/${month}/${i - front + 1}`)
          })
        } else { // 下个月日期
          this.dayList.push({
            date: this.isMoreDate ? new Date(`${_year}/${behindMonth}/${behindDays += 1}`) : ''
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  width: 1100px;
}
.week {
  display: flex;
  flex-wrap: wrap;
  p {
    height: 30px;
    text-align: center;
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  margin: 0;
  padding: 0;
  li {
    height: 120px;
    border: 1px solid #ccc;
    list-style: none;
    box-sizing: border-box;
  }
}
.now {
  span {
    background: red;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    color: #fff;
  }
}
</style>
