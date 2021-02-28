import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntityCreationPage} from "../entity-creation/entity-creation";
import {Entity} from "../../interface/entity";
//import {Location, Appearance, GermanAddress} from "@angular-material-extensions/google-maps-autocomplete";
//import PlaceResult = google.maps.places.PlaceResult;

/**
 * Generated class for the AddMobilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-mobility',
  templateUrl: 'add-mobility.html',
})
export class AddMobilityPage implements OnInit{
  promo: '';
  mobilityStartDate: any;
  mobilityEndDate: any;
  promosTitle = [
    "CITISE1", "CITISE2", "FISE1", "FISEA3"
  ]
  countries = [];
  towns = [];
  entities = [];
  mobilityForm: FormGroup;

  @ViewChild('slides', {read: Slides}) slides: Slides;

  onEnd() {
    console.log(this.slides.isEnd());
    return this.slides.isEnd();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public modalCtrl : ModalController) {
  }

  ngOnInit(){
    this.initForm();
  }
  initForm(){
    this.mobilityForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name : ['',Validators.required],
      promo : ['',Validators.required],
      country : ['',Validators.required],
      town: ['',Validators.required],
      entity: ['',Validators.required],
      startDate : [Date,Validators.required],
      endDate : [Date,Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMobilityPage');
  }

  onSubmitForm() {
    const formValue = this.mobilityForm.value;
    console.log(formValue);
  }

  private refreshCountries() {
    this.countries = ["France", "USA", "Inde", "République Centre-Africaine", "A", "D", "C", "E", "g"];
  }

  private refreshTowns(country: string) {
    this.towns = ["Givry", "Chalon", "Macon", "Thionville", "Saint etienne", "Marseille", "Saint Marcellin"];
  }

  private refreshEntities(country : string, town : string){
    //this.entities = ["Intech","Mutest","TSE"];
    this.entities = [];
    this.entities.push(new Entity(0,"Intech","0782451213","intech@mail.lu","Company",""));
    this.entities.push(new Entity(0,"Mutest","0666666666","aem@mutest.fr","Company",""));
    this.entities.push(new Entity(0,"TSE","0782451213","intech@mail.lu","University",""));
  }

  getCountries(ev: any) {
    // Reset items back to all of the items
    this.refreshCountries();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.countries = this.countries.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getTowns(ev: any) {
    // Reset items back to all of the items
    this.refreshTowns("France");

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.towns = this.towns.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getEntities(ev: any){
    // Reset items back to all of the items
    this.refreshEntities("France","Saint Etienne");

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.entities = this.entities.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  isEnabled(){
    let enable = false;
    enable = this.countries.length == 1;
    this.disable("town",!enable);
    enable = enable && this.towns.length == 1;
    this.disable("entity",!enable);
    return enable;
  }
  disable(id:string,disable:boolean) {
    const inputs: any = document.getElementById(id).getElementsByTagName("INPUT");
    inputs[0].disabled=disable;
    inputs[0].placeholder=(disable)?"Please fill the searchbar above":(id =="entity")?"Company/University name":"Town name";
  }

  createEntity(){
    let modal = this.modalCtrl.create(EntityCreationPage);
    modal.present();
  }
}
