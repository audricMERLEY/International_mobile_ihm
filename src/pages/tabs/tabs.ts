import { Component } from '@angular/core';

import {SearchMobilityPage} from "../search-mobility/search-mobility";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = SearchMobilityPage;

  constructor() {

  }
}
