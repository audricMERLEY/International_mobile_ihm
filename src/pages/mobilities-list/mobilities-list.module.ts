import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobilitiesListPage } from './mobilities-list';

@NgModule({
  declarations: [
    MobilitiesListPage,
  ],
  imports: [
    IonicPageModule.forChild(MobilitiesListPage),
  ],
})
export class MobilitiesListPageModule {}
