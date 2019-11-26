import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/accordifysolutions/ck39u6rml0j1w1cs2rvnghwv0';
  lat = 37.75;
  lng = -122.41;
  geojson = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.031952, 38.913184]
      },
      properties: {
        'marker-color': '#3bb2d0',
        'marker-size': 'large',
        'marker-symbol': 'rocket'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.41, 37.75]
      },
      properties: {
        'marker-color': '#3bb2d0',
        'marker-size': 'large',
        'marker-symbol': 'rocket'
      }
    }
  ];
  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    mapboxgl.featureLayer(this.geojson).addTo(this.map);
  }

  navigateStore(longitude: any, latitude: any) {
    this.lng = longitude;
    this.lat = latitude;
    console.log("clicked", longitude, " ", latitude);
    this.map.flyTo({ center: [this.lng, this.lat] });

  }
  onRightClick(e) {
    this.map.on('mousemove', function (e) {
      console.log(e.point);
      console.log(e.lngLat);
      document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat.wrap());
    });
  }
}