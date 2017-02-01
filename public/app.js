import paginate from './paginate';

function display(calendar) {
  const el = document.querySelector('calendar-of-babes');
  el.queue = calendar.days;
}

function loadCalendar() {
  fetch('calendar.json')
    .then(r => r.json())
    .then(display)
    .then(paginate);
}

export default { loadCalendar };
