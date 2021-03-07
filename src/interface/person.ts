import {Entity} from "./entity";
import {Mobility} from "./mobility";
import {ROLE} from "../app/app.module";
import {Input} from "@angular/core";


export class Person{
  id : number;
  firstName : String;
  lastName: String;
  description : String;
  email : String;
  promo : String;
  parcours : String;
  mobilities : Mobility[];
  image : String;
  role : ROLE;
  birthDate : Date;
  password : string = "zert";
  userName : string = "t";



  constructor(id:number,firstName : String,lastName: String,
  description : String,email : String,imageSrc : String,role : ROLE,promo : String,
  parcours : String,mobilities : Mobility[], birthDate : Date = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.email = email;
    this.promo = promo;
    this.parcours = parcours;
    this.mobilities = mobilities;
    this.image = imageSrc;
    this.role = role;
    this.birthDate = (birthDate == null)?new Date(1998,22,11):birthDate;
  }

}
