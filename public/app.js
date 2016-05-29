/*jslint esversion: 6 */

class App {

  constructor() {
    let today = this.getToday();
    document.querySelector('#join-day').innerHTML = `#day${today}`;
    fetch('calendar.json')
      .then(r => r.json())
      .then(calendar => this.popFuture(calendar, today))
      .then(calendar => this.ensureToday(calendar, today))
      .then(calendar => this.display(calendar, today));
  }

  popFuture(calendar, today) {
    for (let day of calendar.days) {
      if(day.num > today) {
        calendar.days.shift();
      }
    }
    return calendar;
  }

  ensureToday(calendar, today) {
    let first = calendar.days[0];
    if(first.num === today) {
      return calendar;
    }
    let dayForToday = {
      num: today,
      images: [],
    };
    calendar.days.unshift(dayForToday);
    return calendar;
  }

  display(calendar, today) {
    let el = document.querySelector('calendar-of-babes');
    el.days = calendar.days;
    el.today = today;
  }

  getToday() {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

}

export default App;
