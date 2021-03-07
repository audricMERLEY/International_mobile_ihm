import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMobilityPage } from './search-mobility';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SearchMobilityPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMobilityPage),
    ComponentsModule,
  ],
})
export class SearchMobilityPageModule {}
