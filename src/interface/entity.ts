export class Entity{
  id:number;
  name:string;
  tel:string;
  email:string;
  type:string;
  commentary:string;
  logoPath:string;
  constructor(id:number,name:string,tel:string,email:string,type:string,commentary:string,logoPath:string="assets\\imgs\\default.png") {
    this.id = id;
    this.name=name;
    this.tel= tel;
    this.email= email;
    this.type= type;
    this.commentary= commentary;
    this.logoPath= logoPath;
  }

}
