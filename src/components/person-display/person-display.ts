import {Component, Input} from '@angular/core';
import {Person} from "../../interface/person";
import {ROLE} from "../../app/app.module";
import {ModalController} from "ionic-angular";
import {AddPersonPage} from "../../pages/add-person/add-person";
import {PersonServiceProvider} from "../../providers/person-service/person-service";
import {AddMobilityPage} from "../../pages/add-mobility/add-mobility";

/**
 * Generated class for the PersonDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'person-display',
  templateUrl: 'person-display.html'
})
export class PersonDisplayComponent {

  @Input()
  person : Person;

  isStudent(){
    return true;
  }
  constructor(public modalCtrl: ModalController, private personService : PersonServiceProvider) {

  }


  modPerson(){
    let modal = this.modalCtrl.create(
      AddPersonPage,
      { personToMod: this.person }
    );
    modal.present();
  }
  addPerson(){
    let modal = this.modalCtrl.create(AddPersonPage);
    modal.present();
  }
  addMobility(){
    let modal = this.modalCtrl.create(
      AddMobilityPage,
      { person: this.person }
    );
    modal.present();
  }

}
