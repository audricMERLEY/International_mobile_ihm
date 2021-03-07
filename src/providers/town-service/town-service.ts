import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Country} from "../../interface/country";
import {Town} from "../../interface/town";
import {AppModule} from "../../app/app.module";
import {Person} from "../../interface/person";
import {map} from "rxjs/operators";
import {analyzeAndValidateNgModules} from "@angular/compiler";

/*
  Generated class for the TownServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TownServiceProvider {

  constructor(public http: HttpClient) {
  }

  converterTown(data : any){
    return new Town(data.id,data.label);
  }
  getAllTowns(){
    return this.http.get(AppModule.URL+"/location/towns").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterTown(d));
        }
        return res;
      })
    );
  }
  getTownById(id:number){
    return this.http.get(AppModule.URL+"/location/towns/"+id).pipe(
      map((data : any)=> this.converterTown(data))
    );
  }
  getTownsByName(name:string){
    return this.http.get(AppModule.URL+"/location/towns/name/"+name).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterTown(d));
        }
        return res;
      })
    );
  }
  getTownsByCountry(id : number){
    return this.http.get(AppModule.URL+"/location/countries/"+id+"/towns").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterTown(d));
        }
        return res;
      })
    );
  }
  addTown(idCountry : number,town : Town){
    return this.http.post(AppModule.URL+"/location/countries/"+idCountry+"/towns/add",town).pipe(
      map((data:any)=>this.converterTown(data))
    );
  }
  removeTown(id:number){
    return this.http.delete(AppModule.URL+"/location/towns/"+id+"/remove").pipe(
      map((data:any)=>data)
    );
  }
}
