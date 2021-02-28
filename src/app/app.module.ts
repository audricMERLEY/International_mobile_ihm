import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AddMobilityPageModule} from "../pages/add-mobility/add-mobility.module";
import {SearchMobilityPageModule} from "../pages/search-mobility/search-mobility.module";
import {MobilitiesListPageModule} from "../pages/mobilities-list/mobilities-list.module";
import {MobilityDetailsPageModule} from "../pages/mobility-details/mobility-details.module";
import {EntityCreationPageModule} from "../pages/entity-creation/entity-creation.module";

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddMobilityPageModule,
    MobilitiesListPageModule,
    MobilityDetailsPageModule,
    SearchMobilityPageModule,
    EntityCreationPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
