import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Mobility} from "../../interface/mobility";
import {Person} from "../../interface/person";
import {Entity} from "../../interface/entity";
import {PersonServiceProvider} from "../../providers/person-service/person-service";
import {MobilityServiceProvider} from "../../providers/mobility-service/mobility-service";
import {EntityServiceProvider} from "../../providers/entity-service/entity-service";
import {TownServiceProvider} from "../../providers/town-service/town-service";
import {CountryServiceProvider} from "../../providers/country-service/country-service";
import {Town} from "../../interface/town";
import {Country} from "../../interface/country";
import {Localisation} from "../../app/app.module";
import {Subscription} from "rxjs";
import {MapServiceProvider} from "../../providers/map-service/map-service";

/**
 * Generated class for the SearchMobilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-mobility',
  templateUrl: 'search-mobility.html',
})
export class SearchMobilityPage implements OnInit,OnDestroy{


  filter: string = "";
  searchValue : string = "";
  mobilityFilter: string[] = ["All","Title name", "Country name", "Town name", "Person name"];
  personFilter: string[] = ["All","Person name", "Person firstname", "Person lastname"];
  entityFilter: string[] = ["All","Entity name", "Country name", "Town name"];
  checked: {} = {};
  mobilitySearch: Mobility[];
  entitySearch: Entity[];
  personSearch: Person[];
  localisations : Localisation[] = [];
  localSubscription : Subscription;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              private personService : PersonServiceProvider, private mobilityService : MobilityServiceProvider,
              private entityService : EntityServiceProvider, private townService : TownServiceProvider, private countryService : CountryServiceProvider,
              private mapService : MapServiceProvider) {
    for (let el of this.mobilityFilter) {
      this.checked[el] = false;
    }
    for (let el of this.personFilter) {
      this.checked[el] = false;
    }
    for (let el of this.entityFilter) {
      this.checked[el] = false;
    }
  }
  ngOnInit(): void {
    this.localSubscription = this.mapService.localisationSubject.subscribe(
      (loc : Localisation[]) => {
        this.localisations=loc;
      }
    );
    this.mapService.emitLocalisationSubject();
  }

  ionViewDidLoad() {
  }



  isSelected(filter: string) {
    return this.filter.toLowerCase() === filter.toLowerCase()
  }

  choiceChange(selectedValue: any) {
    if (this.filter != selectedValue) {
      this.filter = selectedValue;
      for (let el in this.checked) {
        this.checked[el] = false;
      }
      this.refreshResult();
    }
  }

  checkBoxClick(element: string) {
    this.checked[element] = !this.checked[element];
    this.refreshResult();
  }

  searchBarChange(event){
    if(this.searchValue.toLowerCase().trim() != event.target.value.toLowerCase().trim()){
      this.searchValue = event.target.value;
      this.refreshResult();
    }

  }

  async refreshResult() {
    console.log(this.checked);
    this.entitySearch = [];
    this.mobilitySearch = [];
    this.personSearch = [];
    this.mapService.addLocalisations([]);
    if (this.filter === "Person") {
      this.refreshPersonResult();
    } else if (this.filter === "Mobility") {
      this.refreshMobilityResult();
    } else if (this.filter === "Entity") {
      this.refreshEntityResult();
    }
  }


  private refreshPersonResult(){
    if(this.checked["All"]){
      this.personService.getAllPersons().subscribe(
        (persons : Person[]) => {
          this.personSearch = persons;
          this.refreshMarker();
        },error => console.log(error)
      )
    }else if (this.checked["Person firstname"] && this.checked["Person lastname"] ||this.checked["Person name"] ) {
      this.personService.getPersonByName(this.searchValue).subscribe(
        (persons : Person[]) => {this.personSearch = persons;
        this.refreshMarker()},
        error => console.log(error)
      );
    }else{
      if(this.checked["Person firstname"]){
        this.personService.getPersonByFirstName(this.searchValue).subscribe(
          (persons : Person[]) => {this.personSearch = persons;
            this.refreshMarker()},
          error => console.log(error)
        );
      }else if (this.checked["Person lastname"]){
        this.personService.getPersonByLastName(this.searchValue).subscribe(
          (persons : Person[]) => {this.personSearch = persons;
            this.refreshMarker()},
          error => console.log(error)
        );
      }
    }
  }

  //  mobilityFilter: string[] = ["All","Title name", "Country name", "Town name", "Person name"];
  private refreshMobilityResult(){
    if(this.checked["All"]){
      this.mobilityService.getAllMobilities().subscribe(
        (mobilities : Mobility[]) => {this.mobilitySearch = mobilities;this.refreshMarker();},
        error => console.log(error)
      );
    }else{
      if(this.checked["Title name"]){
        this.mobilityService.getMobilitiesByTitle(this.searchValue).subscribe(
          (mobilities : Mobility[])=>{
            this.mobilitySearch = mobilities;
            this.refreshMarker();
          },error => console.log(error)
        )
      }
      if(this.checked["Country name"]){
        this.countryService.getCountriesByName(this.searchValue).subscribe(
          (countries : Country[])=>{
            for(let c of countries){
              this.townService.getTownsByCountry(c.id).subscribe(
                (towns : Town[])=>{
                  this.getMobilitiesByTowns(towns);
                },error => console.log(error)
              )
            }
          },error => console.log(error)
        )
      }
      if(this.checked["Town name"]){
        this.townService.getTownsByName(this.searchValue).subscribe(
          (towns : Town[])=>{
            this.getMobilitiesByTowns(towns);
          },error => console.log(error)
        );
      }
      if(this.checked["Person name"]){
        this.personService.getPersonByName(this.searchValue).subscribe(
          (persons : Person[])=>{
            for(let p of persons){
              this.mobilityService.getMobilitiesByPerson(p.id).subscribe(
                (mobilities : Mobility[])=>{
                  mobilities.map((m : Mobility)=>
                  {
                    if(this.mobilitySearch.filter(mo => mo.id == m.id).length == 0){
                      this.mobilitySearch.push(m);
                      this.refreshMarker();
                    }
                  });
                },error => console.log(error)
              )
            }
          },error => console.log(error)
        )
      }
    }
  }

  private getMobilitiesByTowns(towns : Town[]){
    for(let t of towns){
      this.entityService.getEntityByTown(t.id).subscribe(
        (entities : Entity[])=>{
          for(let e of entities){
            this.mobilityService.getMobilitiesByEntity(e.id).subscribe(
              (mobilities : Mobility[])=>{
                mobilities.map((m : Mobility)=>
                {
                  if(this.mobilitySearch.filter(mo => mo.id == m.id).length == 0){
                    this.mobilitySearch.push(m);
                    this.refreshMarker();
                  }
                });
              },error => console.log(error)
            )
          }
        },error => console.log(error)
      )
    }
  }

  //   entityFilter: string[] = ["All","Entity name", "Country name", "Town name"];
  private refreshEntityResult(){
    if(this.checked["All"]){
      this.entityService.getAllEntity().subscribe(
        (entities : Entity[]) => {this.entitySearch = entities;this.refreshMarker();},
        error => console.log(error)
      );
    }else{
      if(this.checked["Entity name"]){
        this.entityService.getEntityByTitle(this.searchValue).subscribe(
          (entities : Entity[])=>{
            entities.map((e : Entity)=>
            {
              if(this.entitySearch.filter(en => en.id == e.id).length == 0){
                this.entitySearch.push(e);
                this.refreshMarker();
              }
            });
          },error => console.log(error)
        )
      }

      if(this.checked["Country name"]){
        this.countryService.getCountriesByName(this.searchValue).subscribe(
          (countries : Country[])=>{
            for(let c of countries){
              this.townService.getTownsByCountry(c.id).subscribe(
                (towns : Town[])=>{
                  for(let t of towns){
                    this.entityService.getEntityByTown(t.id).subscribe(
                      (entities : Entity[])=>{
                        entities.map((e : Entity)=>
                        {
                          if(this.entitySearch.filter(en => en.id == e.id).length == 0){
                            this.entitySearch.push(e);
                            this.refreshMarker();
                          }
                        });
                      },error => console.log(error)
                    )
                  }
                },error => console.log(error)

              )
            }
          },error => console.log(error)

        )
      }

      if(this.checked["Town name"]){
        this.townService.getTownsByName(this.searchValue).subscribe(
          (towns : Town[])=>{
            for(let t of towns){
              this.entityService.getEntityByTown(t.id).subscribe(
                (entities : Entity[])=>{
                  entities.map((e : Entity)=>
                  {
                    if(this.entitySearch.filter(en => en.id == e.id).length == 0){
                      this.entitySearch.push(e);
                      this.refreshMarker();
                    }
                  });
                },error => console.log(error)
              )
            }
          },error => console.log(error)
        );
      }
    }
  }

  private refreshMarker(){
    this.localisations = [];
    this.mapService.addLocalisations(this.localisations);
    for (let e of this.entitySearch){
      let loc = new Localisation();
      loc.latitude =e.latitude;
      loc.longitude= e.longitude;
      loc.description = e.title;
      this.localisations.push(e);
    }
    this.mapService.addLocalisations(this.localisations);
    for(let m of this.mobilitySearch){
      this.entityService.getEntityByMobility(m.id).subscribe(
        (e : Entity)=>{
          let loc = new Localisation();
          loc.latitude =e.latitude;
          loc.longitude= e.longitude;
          loc.description = e.title;
          this.localisations.push(e);
          this.mapService.addLocalisations(this.localisations);
        },error => console.log(error)
      )
    }
    for(let p of this.personSearch){
      this.entityService.getEntitiesByPerson(p.id).subscribe(
        (es : Entity[])=>{
          for (let e of es){
            let loc = new Localisation();
            loc.latitude =e.latitude;
            loc.longitude= e.longitude;
            loc.description = e.title;
            this.localisations.push(e);
            this.mapService.addLocalisations(this.localisations);
          }
        },error => console.log(error)
      )
    }

  }

  ngOnDestroy(): void {
    this.localSubscription.unsubscribe();
  }

}
