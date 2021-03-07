import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AddMobilityPageModule} from "../pages/add-mobility/add-mobility.module";
import {SearchMobilityPageModule} from "../pages/search-mobility/search-mobility.module";
import {EntityCreationPageModule} from "../pages/entity-creation/entity-creation.module";
import {ComponentsModule} from "../components/components.module";
import { MobilityServiceProvider } from '../providers/mobility-service/mobility-service';
import { EntityServiceProvider } from '../providers/entity-service/entity-service';
import { PersonServiceProvider } from '../providers/person-service/person-service';
import { UtilsProvider } from '../providers/utils/utils';
import { CountryServiceProvider } from '../providers/country-service/country-service';
import { TownServiceProvider } from '../providers/town-service/town-service';
import {HttpClientModule} from "@angular/common/http";
import { ImageProvider } from '../providers/image/image';
import {AddPersonPageModule} from "../pages/add-person/add-person.module";
import { MapServiceProvider } from '../providers/map-service/map-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddMobilityPageModule,
    AddPersonPageModule,
    SearchMobilityPageModule,
    EntityCreationPageModule,
    ComponentsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MobilityServiceProvider,
    EntityServiceProvider,
    PersonServiceProvider,
    UtilsProvider,
    CountryServiceProvider,
    TownServiceProvider,
    ImageProvider,
    MapServiceProvider
  ]
})


export class AppModule {
  static URL : String = "http://localhost:8084";
}
export class ROLE {
  id : number = 0;
  label : String = "";
}
export class Localisation {
  latitude : number;
  longitude:number;
  description : string;
}
