import { NgModule } from '@angular/core';
import { MobilityDisplayComponent } from './mobility-display/mobility-display';
import {IonicModule} from "ionic-angular";
import { EntityDisplayComponent } from './entity-display/entity-display';
import { PersonDisplayComponent } from './person-display/person-display';
import { MapDisplayComponent } from './map-display/map-display';
@NgModule({
	declarations: [MobilityDisplayComponent,
    EntityDisplayComponent,
    PersonDisplayComponent,
    MapDisplayComponent],
    imports: [
        IonicModule
    ],
	exports: [MobilityDisplayComponent,
    EntityDisplayComponent,
    PersonDisplayComponent,
    MapDisplayComponent]
})
export class ComponentsModule {}
