import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppModule} from "../../app/app.module";
import {Entity} from "../../interface/entity";
import {map} from "rxjs/operators";
import {Mobility} from "../../interface/mobility";
import {Country} from "../../interface/country";
import {Town} from "../../interface/town";
import {CountryServiceProvider} from "../country-service/country-service";
import {TownServiceProvider} from "../town-service/town-service";
import {Observable} from "rxjs";

/*
  Generated class for the EntityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntityServiceProvider {

  constructor(public http: HttpClient, private countryService : CountryServiceProvider, private townService : TownServiceProvider) {
  }

  convertEntity(data: any){

    let imageSrc : string = AppModule.URL+"/images/"+data.logo;
    let ent = new Entity(data.id,data.title,data.tel,data.email,data.type,data.description,data.employeesNbr,imageSrc);
    ent.latitude = data.latitude;
    ent.longitude = data.longitude;
    return ent;
  }

  getAllEntity(){
    return this.http.get(AppModule.URL+"/entities").pipe(
      map((data:any)=>
      {
        let res = [];
        for(let d of data){
          res.push(this.convertEntity(d));
        }
        return res;
      })
    );
  }
  getEntityById(id:number){
    return this.http.get(AppModule.URL+"/entities/"+id).pipe(
      map((data : any)=> this.convertEntity(data))
    );
  }

  getEntityByTown(id:number){
    return this.http.get(AppModule.URL+"/entities/towns/"+id).pipe(
      map((data:any)=>
      {
        let res = [];
        for(let d of data){
          res.push(this.convertEntity(d));
        }
        return res;
      })
    );
  }
  getEntitiesByPerson(id:number){
    return this.http.get(AppModule.URL+"/entities/persons/"+id).pipe(
      map((data:any)=>
      {
        let res = [];
        for(let d of data){
          res.push(this.convertEntity(d));
        }
        return res;
      })
    );
  }
  getEntityByMobility(id:number){
    return this.http.get(AppModule.URL+"/entities/mobilities/"+id).pipe(
      map((data:Entity)=>
      {
          return this.convertEntity(data);
      })
    );
  }



  getEntityByTitle(title:string){
    return this.http.get(AppModule.URL+"/entities/title/"+title).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.convertEntity(d));
        }
        return res;
      })
    );
  }

  addEntity(entity : Entity,town : Town){
        return this.http.post(AppModule.URL+"/entities/add/towns/"+town.id,entity).pipe(
      map((data : any)=> data));
  }

  modEntity(id:number,entity : Entity){
    return this.http.patch(AppModule.URL+"/entities/"+id+"/modify",entity).pipe(
      map((data : any)=> data)
    );
  }

  removeEntity(id:number){
    return this.http.delete(AppModule.URL+"/entities/"+id+"/remove").pipe(
      map((data:any)=>data)
    );
  }
}
