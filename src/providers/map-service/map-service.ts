import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Localisation} from "../../app/app.module";

/*
  Generated class for the MapServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapServiceProvider {
  localisationSubject = new Subject<Localisation[]>();
  localisations : Localisation[] = [];
  constructor(public http: HttpClient) {
  }

  emitLocalisationSubject() {
    this.localisationSubject.next(this.localisations.slice());
  }

  addLocalisations(localisations : Localisation[]){
    this.localisations = localisations;
    this.emitLocalisationSubject();
  }

}
