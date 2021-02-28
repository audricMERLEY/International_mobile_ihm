import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Entity} from "../../interface/entity";

/**
 * Generated class for the EntityCreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entity-creation',
  templateUrl: 'entity-creation.html',
})
export class EntityCreationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityCreationPage');
  }

  exitPage(){
    this.navCtrl.pop();
  }

  onSubmit(form : NgForm){
    let entity =new Entity(0,form.value['name'],form.value['email'],form.value['type'],form.value['tel'],form.value['comment'],form.value['logo']);
    console.log(entity);
    this.exitPage();
  }
}
