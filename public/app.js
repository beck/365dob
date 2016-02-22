/*jslint esversion: 6 */

import jsonXHR from 'jwarning/json-xhr-promise';

class App {

  constructor() {
    jsonXHR('GET', 'calendar.json').then(calendar => this.display(calendar));
  }

  display(calendar) {
    console.log(this, calendar);
  }

}

export default App;
