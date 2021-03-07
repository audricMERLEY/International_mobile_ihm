import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Slides, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntityCreationPage} from "../entity-creation/entity-creation";
import {Entity} from "../../interface/entity";
import {CountryServiceProvider} from "../../providers/country-service/country-service";
import {Country} from "../../interface/country";
import {TownServiceProvider} from "../../providers/town-service/town-service";
import {Town} from "../../interface/town";
import {EntityServiceProvider} from "../../providers/entity-service/entity-service";
import {Person} from "../../interface/person";
import {Mobility} from "../../interface/mobility";
import {MobilityServiceProvider} from "../../providers/mobility-service/mobility-service";
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
  mobilityStartDate: any;
  mobilityEndDate: any;
  countries : Country[]= [];
  towns :Town[]= [];
  entities: Entity[] = [];
  mobilityForm: FormGroup;
  person : Person;

  @ViewChild('slides', {read: Slides}) slides: Slides;

  onEnd() {
    return this.slides.isEnd();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public modalCtrl : ModalController,
              private countryService : CountryServiceProvider, private townService : TownServiceProvider, private entityService : EntityServiceProvider,
              private mobilityService : MobilityServiceProvider) {
    this.person = this.navParams.get('person');
    if(this.person == null)
      this.exitPage();
  }

  ngOnInit(){
    this.initForm();
  }
  initForm(){
    this.mobilityForm = this.formBuilder.group({
      title : ['',Validators.required],
      comment : ['',Validators.required],
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
    if(this.entities!= null && this.person != null && this.entities.length > 0){
      let mobility = new Mobility(0,formValue['title'],formValue['startDate'],formValue['endDate'],formValue['comment'],this.person);
      this.mobilityService.addMobility(mobility,this.entities[0].id,this.person.id).subscribe(
        (mobility : Mobility)=>{
          this.exitPage();
        },error => console.log(error)
      )
    }

  }

  private refreshCountries(name : string) {
    if(name != null && name.trim().length > 0){
      this.countryService.getCountriesByName(name).subscribe((countries: Country[]) => {
        this.countries = countries;
      }, (error) => console.log(error));
    }else{
      this.countryService.getAllCountries().subscribe((countries: Country[]) => {
        this.countries = countries;
      }, (error) => console.log(error));
    }

  }

  private refreshTowns(name : string, id:number) {

    if(name != null && name.trim().length > 0){
      this.townService.getTownsByCountry(id).subscribe((towns : Town[])=>{
        this.towns = towns.filter((t : Town)=>{return t.label.toLowerCase().includes(name.toLowerCase())});
      },(error) => console.log(error));
    }else{
      this.townService.getTownsByCountry(id).subscribe((towns : Town[])=>{
        this.towns = towns;
      },(error) => console.log(error));
    }
  }

  private refreshEntities(name : string,id : number){
    if(name != null && name.trim().length > 0) {
      this.entityService.getEntityByTown(id).subscribe((entities: Entity[]) => {
        this.entities = entities.filter((e : Entity)=>e.title.toLowerCase().includes(name.toLowerCase()));
      }, (error) => console.log(error));
    }else {
      this.entityService.getEntityByTown(id).subscribe((entities: Entity[]) => {
        this.entities = entities;
      }, (error) => console.log(error));
    }
  }

  getCountries(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    this.refreshCountries(val);
  }

  getTowns(ev: any) {
    if(this.countries.length == 1){
      const val = ev.target.value;
      this.refreshTowns(val,this.countries[0].id);
    }
  }

  getEntities(ev: any){
    if(this.towns.length == 1){
      const val = ev.target.value;
      this.refreshEntities(val,this.towns[0].id)
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
    const modal = this.modalCtrl.create(EntityCreationPage);
    modal.present();
  }

  exitPage(){
    this.navCtrl.pop();
  }
}
