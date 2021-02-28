import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobilityDetailsPage } from './mobility-details';

@NgModule({
  declarations: [
    MobilityDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MobilityDetailsPage),
  ],
})
export class MobilityDetailsPageModule {}
