import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMobilityPage } from './search-mobility';

@NgModule({
  declarations: [
    SearchMobilityPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMobilityPage),
  ],
})
export class SearchMobilityPageModule {}
