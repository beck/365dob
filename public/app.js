import paginate from './paginate';

const today = (() => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
})();

function filterFuture(days) {
  return days.filter(d => d.num <= today);
}

function ensureToday(days) {
  if (days[0].num === today) {
    return days;
  }
  const num = today;
  const images = [];
  return [{ num, images }].concat(days);
}

function display(calendar) {
  document.querySelector('#join-day').innerHTML = `#day${today}`;
  const el = document.querySelector('calendar-of-babes');
  el.queue = calendar.days;
  el.today = today;
}

function cleanupDays(calendar) {
  const cc = Object.assign(calendar);
  cc.days = filterFuture(cc.days);
  cc.days = ensureToday(cc.days);
  return cc;
}

function loadCalendar() {
  fetch('calendar.json')
    .then(r => r.json())
    .then(cleanupDays)
    .then(display)
    .then(paginate);
}

export default { loadCalendar };
