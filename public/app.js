/*jslint esversion: 6 */

import jsonXHR from 'json-xhr-promise';

class App {

  constructor() {
    jsonXHR('GET', 'calendar.json').then(calendar => this.display(calendar));
  }

  display(calendar) {
    document.querySelector('calendar-of-babes').days = calendar.days;
  }

}

export default App;
