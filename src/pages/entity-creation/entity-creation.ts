import {AfterViewInit, Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Entity} from "../../interface/entity";
import {EntityServiceProvider} from "../../providers/entity-service/entity-service";
import {ImageProvider} from "../../providers/image/image";
import {CountryServiceProvider} from "../../providers/country-service/country-service";
import {TownServiceProvider} from "../../providers/town-service/town-service";
import {Country} from "../../interface/country";
import {Town} from "../../interface/town";
import * as Leaflet from "leaflet";

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
export class EntityCreationPage{
  file : File;

  constructor(public navCtrl: NavController, public navParams: NavParams, private entityService : EntityServiceProvider,
              private imageService : ImageProvider, private countryService : CountryServiceProvider, private townService : TownServiceProvider) {
  }


  ionViewDidLoad() {
  }

  exitPage(){
    this.navCtrl.pop();
  }

  onSubmit(form : NgForm){
    let entity =new Entity(0,form.value['name'],form.value['tel'],form.value['email'],form.value['type'],form.value['comment'],15);//,form.value['logo'].name);
    entity.latitude = form.value['latitude'];
    entity.longitude = form.value['longitude']
    if(this.file != null){
      entity.logo = this.file.name;
    }
    else{
      entity.logo = "default.png";
    }
    this.countryService.addCountry(new Country(0,form.value['country'])).subscribe(
      (country)=>{
        let countryId = country.id;
        this.townService.addTown(countryId,new Town(0,form.value['town'])).subscribe(
          (town : Town)=>{
            this.entityService.addEntity(entity,town).subscribe(
              (e : Entity) => {
                if(this.file != null){
                  this.imageService.saveImage(this.file).subscribe(
                    (value:any)=>{
                      this.exitPage();
                    },error => console.log(error)
                  );
                }else{
                  this.exitPage();
                }

              },(error) => console.log(error)
            )
          },(error) => console.log(error)
        )
      },(error) => console.log(error)
    );
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.file = event.target.files[0]; // read file as data url
    }
  }
}
