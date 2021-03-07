import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Mobility} from "../../interface/mobility";
import {AppModule} from "../../app/app.module";
import {map} from "rxjs/operators";
import {Person} from "../../interface/person";

/*
  Generated class for the MobilityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MobilityServiceProvider {

  constructor(public http: HttpClient) {
  }

  converterMobility(data:any){
    return new Mobility(data.id,data.title,data.startDate,data.endDate,data.comment,null);
  }

  getMobilityById(id:number){
    return this.http.get(AppModule.URL+"/mobilities/"+id).pipe(
      map((data : any)=> this.converterMobility(data))
    );
  }

  getAllMobilities(){
    return this.http.get(AppModule.URL+"/mobilities").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterMobility(d));
        }
        return res;
      })
    );
  }

  getMobilitiesByEntity(entityId : number){
    return this.http.get(AppModule.URL+"/entities/"+entityId+"/mobilities").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterMobility(d));
        }
        return res;
      })
    );
  }

  getMobilitiesByPerson(personId : number){
    return this.http.get(AppModule.URL+"/persons/"+personId+"/mobilities").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterMobility(d));
        }
        return res;
      })
    );
  }

  getMobilitiesByTitle(title : String){
    return this.http.get(AppModule.URL+"/mobilities/title/"+title).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterMobility(d));
        }
        return res;
      })
    );
  }

  addMobility(mobility : Mobility,entityId : number,personId : number,){
    return this.http.post(AppModule.URL+"/mobilities/add/entities/"+entityId+"/persons/"+personId,mobility).pipe(
      map((data : any)=> data)
    );
  }

  modMobility(id:number,mobility : Mobility){
    return this.http.patch(AppModule.URL+"/mobilities/"+id+"/modify",mobility).pipe(
      map((data : any)=> data)
    );
  }
  removeMobility(id:number){
    return this.http.delete(AppModule.URL+"/mobilities/"+id+"/remove").pipe(
      map((data:any)=>data)
    );
  }

}
