/* global VisSense */

const poll = {
  id: null,
  start: (fn) => {
    poll.id = window.setInterval(fn, 1000);
  },
  stop: () => {
    window.clearInterval(poll.id);
  },
};

function paginate() {
  const spinner = new VisSense(document.querySelector('#spinner'));
  const calendar = document.querySelector('calendar-of-babes');
  calendar.pop();
  poll.start(() => {
    if (spinner.isHidden()) return;
    calendar.pop();
    if (calendar.queue.length > 0) return;
    calendar.spin = false;
    poll.stop();
  });
}

export default paginate;
