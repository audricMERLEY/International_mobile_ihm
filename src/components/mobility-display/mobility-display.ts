import { Component } from '@angular/core';

/**
 * Generated class for the MobilityDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mobility-display',
  templateUrl: 'mobility-display.html'
})
export class MobilityDisplayComponent {

  text: string;

  constructor() {
    console.log('Hello MobilityDisplayComponent Component');
    this.text = 'Hello World';
  }

}
