
(function (window, $, undefined) {
  var WORKTIME = function (options) {
    this.defaults = {
      'BasicSetting': {},
      'ExtraSetting': {},
      'workStr': "温馨提示：尊敬的客户，我们的服务时间是【$1】<br>如果有重要的事情，请点击<a href='javascript:void(0)' class='dialogue-a fanke-liuyan'>在线留言</a><br>给您带来的不便，敬请谅解.",
      'holidayStr': "温馨提示：尊敬的客户，我们的节假日时间是【$1】<br>如果有重要的事情，请点击<a href='javascript:void(0)' class='dialogue-a fanke-liuyan'>在线留言</a><br>给您带来的不便，敬请谅解.",
      show: function (msg) {}
    }, this.options = $.extend({}, this.defaults, options)
  }
  WORKTIME.prototype = {
    timeZone: '',
    type: 0,
    // type返回的类型节假日2或者是服务时间1或者不返回0
    init: function () {
      var t = this
      var bs = this.options.BasicSetting
      var es = this.options.ExtraSetting
      if (!!bs && bs.open == 1) {
        var bsStart = bs.startTime.split(':')
        var bsEnd = bs.endTime.split(':')
        if (bsStart.length < 2 || bsEnd.length < 2) {
          return false
        }
        var startTime = new Date(),
          endTime = new Date(),
          currentDate = new Date()
        startTime.setHours(bsStart[0])
        startTime.setMinutes(bsStart[1])
        startTime.setSeconds('00')
        endTime.setHours(bsEnd[0])
        endTime.setMinutes(bsEnd[1])
        endTime.setSeconds('00')
        var MonthStr = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1),
          DayStr = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
        var currentDateStr = currentDate.getFullYear() + '-' + MonthStr + '-' + DayStr
        var exceStartTime, exceEndTime // 例外开始,结束时间
        var dateweek = '',
          week = bs.week,
          day = currentDate.getDay()
        var weeks = week.split(',')
        var isEx = false // 是否是例外情况
        for (var i = 0; i <= weeks.length; i++) {
          switch (weeks[i]) {
            case '0':
              dateweek += '星期日&nbsp'
              break
            case '1':
              dateweek += '星期一&nbsp'
              break
            case '2':
              dateweek += '星期二&nbsp'
              break
            case '3':
              dateweek += '星期三&nbsp'
              break
            case '4':
              dateweek += '星期四&nbsp'
              break
            case '5':
              dateweek += '星期五&nbsp'
              break
            case '6':
              dateweek += '星期六&nbsp'
              break
          }
        }
        if (week.length == 13) {
          dateweek = ''
        }
        if (week.indexOf(day) >= 0) {
          if (currentDate.getTime() > endTime.getTime() || currentDate.getTime() < startTime.getTime()) {
            // 不在当前的时间工作时间内
            t.type = 1
            t.timeZone = dateweek + bs.startTime + '-' + bs.endTime
            return false
          }
          // 判断添加了额外的节假时间
          for (var i = 0; i < es.length; i++) {
            if (es[i].exceType == 1 && es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr) {
              exceStartTime = es[i].exceStartTime
              exceEndTime = es[i].exceEndTime
              isEx = true
              break
            }
          }
          if (isEx) {
            t.type = 2
            t.timeZone = exceStartTime + '-' + exceEndTime
            return false
          }
        } else {
          if (week != 'null') {
            // 判断添加了额外的服务时间
            for (var i = 0; i < es.length; i++) {
              if (es[i].exceType == 0 && (es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr)) { // 工作日
                exceStartTime = es[i].exceStartTime
                exceEndTime = es[i].exceEndTime
                isEx = true
                break
              }
            }
            if (!isEx) {
              t.type = 1
              t.timeZone = dateweek + bs.startTime + '-' + bs.endTime
              return false
            }
          }
        }
      }
    },
    iswork: function () {
      var workTime = this
      workTime.type = 0
      var bs = workTime.options.BasicSetting
      var es = workTime.options.ExtraSetting
      if (!!bs && bs.open == 1) {
        var bsStart = bs.startTime.split(':')
        var bsEnd = bs.endTime.split(':')
        if (bsStart.length != 2 || bsEnd.length != 2) {
          return false
        }
        var startTime = new Date(),
          endTime = new Date(),
          currentDate = new Date(nowtime)
        startTime.setHours(bsStart[0])
        startTime.setMinutes(bsStart[1])
        startTime.setSeconds('00')
        endTime.setHours(bsEnd[0])
        endTime.setMinutes(bsEnd[1])
        endTime.setSeconds('00')
        var MonthStr = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1),
          DayStr = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate()
        var currentDateStr = currentDate.getFullYear() + '-' + MonthStr + '-' + DayStr
        var exceStartTime, exceEndTime // 例外开始,结束时间
        var dateweek = '',
          week = bs.week,
          day = currentDate.getDay()
        var weeks = week.split(',')
        var isEx = false // 是否是例外情况
        for (var i = 0; i <= weeks.length; i++) {
          switch (weeks[i]) {
            case '0':
              dateweek += '星期日&nbsp'
              break
            case '1':
              dateweek += '星期一&nbsp'
              break
            case '2':
              dateweek += '星期二&nbsp'
              break
            case '3':
              dateweek += '星期三&nbsp'
              break
            case '4':
              dateweek += '星期四&nbsp'
              break
            case '5':
              dateweek += '星期五&nbsp'
              break
            case '6':
              dateweek += '星期六&nbsp'
              break
          }
        }
        if (week.length == 13) {
          dateweek = ''
        }
        if (week.indexOf(day) >= 0) {
          if (currentDate.getTime() > endTime.getTime() || currentDate.getTime() < startTime.getTime()) {
            // 不在当前的时间工作时间内
            workTime.type = 1
            workTime.timeZone = dateweek + bs.startTime + '-' + bs.endTime
            return false
          }
          // 判断添加了额外的节假时间
          for (var i = 0; i < es.length; i++) {
            if (es[i].exceType == 1 && es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr) {
              exceStartTime = es[i].exceStartTime
              exceEndTime = es[i].exceEndTime
              isEx = true
              break
            }
          }
          if (isEx) {
            workTime.type = 2
            workTime.timeZone = exceStartTime + '-' + exceEndTime
            return false
          }
        } else {
          if (week != 'null') {
            // 判断添加了额外的服务时间
            for (var i = 0; i < es.length; i++) {
              if (es[i].exceType == 0 && (es[i].exceStartTime <= currentDateStr && es[i].exceEndTime >= currentDateStr)) { // 工作日
                exceStartTime = es[i].exceStartTime
                exceEndTime = es[i].exceEndTime
                isEx = true
                break
              }
            }
            if (!isEx) {
              workTime.type = 1
              workTime.timeZone = dateweek + bs.startTime + '-' + bs.endTime
              return false
            }
          }
        }
      }
    },
    getMsg: function () {
      if (this.type == 1) {
        return this.options.workStr.replace(/\$1/g, this.timeZone)
      } else if (this.type == 2) {
        return this.options.holidayStr.replace(/\$1/g, this.timeZone)
      }
      return false
    },
    show: function () {
      var msg = this.getMsg()
      this.options.show(msg)
    }
  }
  $.workTime = function (options) {
    var workTime = new WORKTIME(options)
    workTime.init()
    return workTime
  }
})(window, jQuery)
