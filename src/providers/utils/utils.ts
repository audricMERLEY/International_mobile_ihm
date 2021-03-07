import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController} from "ionic-angular";

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor(public toastCtrl:ToastController) {
  }

  showToastError(message:string,duration:number=1500){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: "top",
      cssClass:"toast-error"
    });
    toast.present();
  }

  showToastValidate(message:string,duration:number=1500){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: "top",
      cssClass:"toast-validate"
    });
    toast.present();
  }

}
