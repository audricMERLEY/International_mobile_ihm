import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Country} from "../../interface/country";
import {AppModule} from "../../app/app.module";
import {map} from "rxjs/operators";

/*
  Generated class for the CountryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryServiceProvider {

  constructor(public http: HttpClient) {
  }
  converterCountry(data : any){
    return new Country(data.id,data.label);
  }
  getAllCountries(){
    return this.http.get(AppModule.URL+"/location/countries").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterCountry(d));
        }
        return res;
      })
    );
  }
  getCountryById(id:number){
    return this.http.get(AppModule.URL+"/location/countries/"+id).pipe(
      map((data : any)=> this.converterCountry(data))
    );
  }
  getCountriesByName(name:string){
    return this.http.get(AppModule.URL+"/location/countries/name/"+name).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterCountry(d));
        }
        return res;
      })
    );
  }
  addCountry(country : Country){
    return this.http.post(AppModule.URL+"/location/countries/add",country).pipe(
      map((data:any)=>this.converterCountry(data))
    );
  }
  removeCountry(id:number){
    return this.http.delete(AppModule.URL+"/location/countries/"+id+"/remove").pipe(
      map((data:any)=>data)
    );
  }


}
