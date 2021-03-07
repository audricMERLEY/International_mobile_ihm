import {Component, Input, OnInit} from '@angular/core';
import {Mobility} from "../../interface/mobility";
import {PersonServiceProvider} from "../../providers/person-service/person-service";
import {TownServiceProvider} from "../../providers/town-service/town-service";
import {CountryServiceProvider} from "../../providers/country-service/country-service";
import {Person} from "../../interface/person";
import {Town} from "../../interface/town";
import {Country} from "../../interface/country";
import {MobilityServiceProvider} from "../../providers/mobility-service/mobility-service";
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
export class MobilityDisplayComponent{


  @Input()
  mobility : Mobility;


  constructor(){

  }


}
