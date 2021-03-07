import {Mobility} from "./mobility";

export class Entity{
  id:number;
  title:string;
  tel:string;
  email:string;
  type:string;
  description:string;
  employeesNbr : number;
  logo:string;
  latitude : number;
  longitude:number;
  constructor(id:number,name:string,tel:string,email:string,type:string,commentary:string,employeesNbr : number ,logoPath:string="assets\\imgs\\default.png") {
    this.id = id;
    this.title=name;
    this.tel= tel;
    this.email= email;
    this.type= type;
    this.description= commentary;
    this.logo = logoPath;
    this.employeesNbr = employeesNbr;
  }

}
