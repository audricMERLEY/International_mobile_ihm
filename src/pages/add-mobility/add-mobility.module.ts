import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMobilityPage } from './add-mobility';

@NgModule({
  declarations: [
    AddMobilityPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMobilityPage)
  ]
})
export class AddMobilityPageModule {}
