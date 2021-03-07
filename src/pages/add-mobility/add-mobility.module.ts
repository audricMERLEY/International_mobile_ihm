import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMobilityPage } from './add-mobility';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AddMobilityPage,
  ],
    imports: [
        IonicPageModule.forChild(AddMobilityPage),
        ComponentsModule
    ]
})
export class AddMobilityPageModule {}
