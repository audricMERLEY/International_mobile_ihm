import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntityCreationPage } from './entity-creation';

@NgModule({
  declarations: [
    EntityCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(EntityCreationPage),
  ],
})
export class EntityCreationPageModule {}
