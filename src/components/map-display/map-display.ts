import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import {Localisation} from "../../app/app.module";
import {Subscription} from "rxjs";
import {MapServiceProvider} from "../../providers/map-service/map-service";
// @ts-ignore
// @ts-ignore
/**
 * Generated class for the MapDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map-display',
  templateUrl: 'map-display.html'
})
export class MapDisplayComponent implements OnInit,AfterViewInit,OnDestroy{

  localisations : Localisation[] = [];
  localisationSubscription : Subscription;
  map : Leaflet.Map;
  markers : any[] = [];

  constructor(private mapService : MapServiceProvider) {
    console.log('Hello MapDisplayComponent Component');
  }
  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.leafletMap();
    this.setMarker();
  }

  leafletMap(){
  this.map = new Leaflet.Map('mapId').setView([0, 0], 0);
  var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

  var positron = Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: cartodbAttribution
    }).addTo(this.map);


  // center the map
  }

  setMarker(){
    this.localisationSubscription = this.mapService.localisationSubject.subscribe(
      (locs : Localisation[])=>{
        for(let m of this.markers)
          this.map.removeLayer(m);
        this.markers = [];
        this.localisations = locs;
        for(let l of this.localisations){
          const markPoint = Leaflet.marker([l.latitude, l.longitude]);
          markPoint.bindPopup('<p>'+l.description+'</p>');
          this.map.addLayer(markPoint);
          this.markers.push(markPoint);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.map.remove();
    this.localisationSubscription.unsubscribe();
  }


}
