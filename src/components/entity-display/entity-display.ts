import {Component, Input} from '@angular/core';
import {Entity} from "../../interface/entity";

/**
 * Generated class for the EntityDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entity-display',
  templateUrl: 'entity-display.html'
})
export class EntityDisplayComponent {

  @Input()
  entity : Entity;

  constructor() {
  }
  getLogoPath(){
    return this.entity.logo;
  }

}
