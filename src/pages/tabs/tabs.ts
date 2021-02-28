import { Component } from '@angular/core';


import {AddMobilityPage} from "../add-mobility/add-mobility";
import {MobilitiesListPage} from "../mobilities-list/mobilities-list";
import {SearchMobilityPage} from "../search-mobility/search-mobility";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddMobilityPage;
  tab2Root = MobilitiesListPage;
  tab3Root = SearchMobilityPage;

  constructor() {

  }
}
