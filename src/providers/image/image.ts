import {HttpClient, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {AppModule} from "../../app/app.module";

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(public http: HttpClient) {
  }

  saveImage(file:any){
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', AppModule.URL+"/images", data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
    //return this.http.post(AppModule.URL+"/images",formData).pipe(map((data:any)=>data));
  }

}
