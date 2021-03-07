import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Person} from "../../interface/person";
import {AppModule} from "../../app/app.module";
import {AlertController} from "ionic-angular";
import {UtilsProvider} from "../utils/utils";

/*
  Generated class for the PersonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PersonServiceProvider {
  constructor(public http: HttpClient,private alertCtrl : AlertController, private utils : UtilsProvider) {
  }

  converterPerson(data : any){
    let imageSrc : String = AppModule.URL+"/images/"+data.image;
    return new Person(data.id,data.firstName,data.lastName,data.description,data.email,imageSrc,data.role.label,data.promo,data.parcours,null);
  }
  getPersonById(id:number){
    return this.http.get(AppModule.URL+"/persons/"+id).pipe(
      map((data : any)=> this.converterPerson(data))
    );
  }

  getPromos(){
    return this.http.get(AppModule.URL+"/persons/promosType").pipe(
      map((data : any)=> data)
    );
  }
  getParcours(){
    return this.http.get(AppModule.URL+"/persons/parcoursType").pipe(
      map((data : any)=> data)
    );
  }

  getAllPersons(){
    return this.http.get(AppModule.URL+"/persons").pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterPerson(d));
        }
        return res;
      })
    );
  }


  getPersonByName(name:String){
    return this.http.get(AppModule.URL+"/persons/name/"+name).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterPerson(d));
        }
        return res;
      })
    );
  }

  getPersonByFirstName(firstName:String){
    return this.http.get(AppModule.URL+"/persons/firstName/"+firstName).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterPerson(d));
        }
        return res;
      })
    );
  }

  getPersonByLastName(lastName:String){
    return this.http.get(AppModule.URL+"/persons/lastName/"+lastName).pipe(
      map((data : any)=> {
        let res = [];
        for(let d of data){
          res.push(this.converterPerson(d));
        }
        return res;
      })
    );
  }

  getRoles(){
    return this.http.get(AppModule.URL+"/persons/roles").pipe(
      map((data : any)=> data)
    );
  }

  addPerson(person : Person){
    return this.http.post(AppModule.URL+"/persons/add",person).pipe(
      map((data : any)=> data)
    );
  }

  modPerson(id:number,person : Person){
    return this.http.patch(AppModule.URL+"/persons/"+id+"/modify",person).pipe(
      map((data : any)=> data)
    );
  }

  removePerson(id:number){

    return this.http.delete(AppModule.URL+"/persons/"+id+"/remove").pipe(
      map((data:any)=> data)
    );
  }

  showRemoveAlert(first_name:String,last_name:String):Promise<boolean>{
    return new Promise((resolve, reject) =>{
      const alert = this.alertCtrl.create({
        title: 'Remove Person!',
        subTitle: 'Do you really want to remove the person '+first_name+' '+last_name.toUpperCase()+" ?\nTo confirm, write Remove",
        inputs: [
          {
            name: 'confirmationMsg',
            placeholder: 'Remove'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              this.utils.showToastError("Cancel",400);
              resolve(false);
            }
          },
          {
            text: 'Remove',
            handler: data => {
              if(data.confirmationMsg ==="Remove"){
                resolve(true);
              }else{
                this.utils.showToastError("Not the good confirmation message, please retry by writing 'Remove'");
                return false;
              }
            }
          }
        ]
      }).present();
    });
  }

}
