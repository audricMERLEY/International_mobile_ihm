import {Entity} from "./entity";
import {Person} from "./person";

export class Mobility{
  id:number;
  startDate : Date;
  endDate : Date;
  comment : String = "";
  person : Person;
  entity : Entity;
  title : String;
  constructor(id:number,title:String,startDate:Date,endDate :Date,comment : String,person : Person) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.comment= comment;
    this.person = person;
  }
}
