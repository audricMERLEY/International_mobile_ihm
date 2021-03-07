import {Component, Input, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ROLE} from "../../app/app.module";
import {PersonServiceProvider} from "../../providers/person-service/person-service";
import {Person} from "../../interface/person";
import {ImageProvider} from "../../providers/image/image";

/**
 * Generated class for the AddPersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-person',
  templateUrl: 'add-person.html',
})
export class AddPersonPage implements OnInit{

  personToMod : Person = null;

  ongletTitle : String = "Add person";
  birthDate : Date;
  personForm: FormGroup;
  promo : String;
  parcours : String;
  role : ROLE;
  parcoursTitle : string[] = [];
  promosTitle : string[] = [];
  rolesTitle : string[] = [];
  file : File;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,
              private personService : PersonServiceProvider,private imageService : ImageProvider) {
    this.personToMod = this.navParams.get('personToMod');
  }

  ionViewDidLoad() {
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.file = event.target.files[0]; // read file as data url
    }
  }

  ngOnInit(){
    if(this.personToMod != null)
      this.ongletTitle = "Modify person";
    this.personService.getParcours().subscribe(
      (parcours : string[])=>this.parcoursTitle = parcours,
      error => console.log(error)
    );
    this.personService.getPromos().subscribe(
      (promo : string[])=>this.promosTitle = promo,
      error => console.log(error)
    );
    this.rolesTitle.push("Admin");
    this.rolesTitle.push("Student");
    this.initForm();
  }
  initForm(){
    if(this.personToMod != null){
      this.personForm = this.formBuilder.group({
        first_name : [this.personToMod.firstName, Validators.required],
        last_name : [this.personToMod.lastName,Validators.required],
        user_name : [this.personToMod.userName,Validators.required],
        email : [this.personToMod.email,Validators.required],
        description : [this.personToMod.description,Validators.required],
        promo : [this.personToMod.promo,Validators.required],
        parcours : [this.personToMod.parcours,Validators.required],
        role : [this.personToMod.role.label,Validators.required],
        birth_date : [this.personToMod.birthDate,Validators.required],
        image : null
      });
    }else{
    this.personForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name : ['',Validators.required],
      user_name : ['',Validators.required],
      email : ['',Validators.required],
      description : ['',Validators.required],
      promo : ['',Validators.required],
      parcours : ['',Validators.required],
      role : ['',Validators.required],
      birth_date : ['',Validators.required],
      image : null
    });
    }
  }

  onSubmitForm() {
    const formValue = this.personForm.value;
    let r = new ROLE();
    r.id = this.rolesTitle.indexOf(formValue['role'])+1;
    r.label = formValue['role'];
    let person = new Person(0,formValue['first_name'],formValue['last_name'],formValue['description'],formValue['email'],
      "",r,formValue['promo'],formValue['parcours'],[],formValue['birth_date']);
    person.userName = formValue['user_name'];

    if(this.personToMod != null){
      if(this.file == null)
        person.image = this.personToMod.image;
      else
        person.image = this.file.name;
      this.personService.modPerson(this.personToMod.id,person).subscribe(
        (p : Person)=>{
          if(this.file != null){
            this.imageService.saveImage(this.file).subscribe(
              (res : any)=>this.exitPage(),
              error => console.log(error)
            );
          }else{
            this.exitPage();
          }

        },error => console.log(error)
      );
    }else{
      if(this.file == null)
        person.image = "default.png";
      else
        person.image = this.file.name;
      this.personService.addPerson(person).subscribe(
        (p : Person)=>{
          if(this.file != null){
            this.imageService.saveImage(this.file).subscribe(
              (res : any)=>this.exitPage(),
              error => console.log(error)
            );
          }else{
            this.exitPage();
          }

        },error => console.log(error)
      );
    }


  }
  exitPage(){
    this.navCtrl.pop();
  }

}
