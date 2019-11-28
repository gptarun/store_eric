import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MapboxService } from '../services/mapbox.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  isAdd = false;
  isEdit = false;
  map: mapboxgl.Map;
  style = 'mapbox://styles/accordifysolutions/ck39u6rml0j1w1cs2rvnghwv0';
  lat = 12.990913150422628;
  lng = 77.58686444350997;
  newMarkerCoord = [];
  xval = '';

  constructor(private mapboxService: MapboxService) { }

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

    this.map.on('load', (event) => {
      this.map.addSource('customMarker', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
      const markers = this.mapboxService.getMarkers();
      const data = {
        type: 'FeatureCollection',
        features: markers
      };
      this.map.getSource('customMarker').setData(data);

      this.map.addLayer({
        id: 'customMarketid',
        source: 'customMarker',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 10,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'icon-size': 2,
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });
    });
  }

  navigateStore(longitude: any, latitude: any) {
    this.lng = longitude;
    this.lat = latitude;
    this.map.flyTo({ center: [this.lng, this.lat] });

  }
  addMarker() {
    this.isAdd = true;

    this.map.on('click', function (e) {      
      //console.log(e.lngLat.lng);
      //console.log(e.lngLat.lat);
      document.getElementById('xcord').value = e.lngLat.lng;
      document.getElementById('ycord').value = e.lngLat.lat;
      //+ JSON.stringify(e.point) + '<br />'
      //document.getElementById('info').innerHTML = e.lngLat;
    });

    const markers = this.mapboxService.getMarkers();
    //console.log(document.getElementById('xcord').value);
    markers.push({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [document.getElementById('xcord').value, document.getElementById('ycord').value],
      },
      'properties': {
        'message': 'Location 3',
      }
    });
    console.log(markers);
    const data = {
      type: 'FeatureCollection',
      features: markers
    };
    this.map.getSource('customMarker').setData(data);

  }

  hideAdd() {
    this.isAdd = false;
  }
}

export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) { }
}