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
  xvalue = '';
  yvalue = '';
  storeName = '';
  storeDetails = '';
  storeCategory = '';
  storeId = 0;
  response = {};
  markers = [];
  markerListLength = 0;
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

      this.mapboxService.getMarkersAPI().subscribe((responseData: any[]) => {
        this.response = responseData;
        this.markerListLength = responseData.length;
        this.markers = this.convertResponseToGeoSon(this.response);
        const data = {
          type: 'FeatureCollection',
          features: this.markers
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
      })
    });
    this.map.on('click', function (e) {
      //console.log(e.lngLat.lng);
      //console.log(e.lngLat.lat);
      (<HTMLInputElement>document.getElementById('xcord')).value = e.lngLat.lng;
      (<HTMLInputElement>document.getElementById('ycord')).value = e.lngLat.lat;
      //+ JSON.stringify(e.point) + '<br />'
      //document.getElementById('info').innerHTML = e.lngLat;
    });

  }

  navigateStore(uiAddress) {
    var address = uiAddress.split(',');
    this.lng = address[0];
    this.lat = address[1];
    this.map.flyTo({ center: [this.lng, this.lat] });

  }
  addMarker() {
    this.isAdd = true;
    // removing newly added marker if user wants to change it location. If not remove then you will have multiple new location markers
    if (this.markerListLength < this.markers.length) {
      this.markers.splice(this.markers.length - 1, 1);
    }
    this.markers.push({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [(<HTMLInputElement>document.getElementById('xcord')).value, (<HTMLInputElement>document.getElementById('ycord')).value]
      },
      'properties': {
        'message': 'New Store',
      }
    });
    const data = {
      type: 'FeatureCollection',
      features: this.markers
    };
    this.map.getSource('customMarker').setData(data);
  }

  hideAdd() {
    this.isAdd = false;
    this.markers.splice(this.markers.length - 1, 1);
    const data = {
      type: 'FeatureCollection',
      features: this.markers
    };
    this.map.getSource('customMarker').setData(data);
  }


  saveMarker() {
    this.mapboxService.saveMarker(this.storeName, this.storeDetails, this.storeCategory, (<HTMLInputElement>document.getElementById('xcord')).value, (<HTMLInputElement>document.getElementById('ycord')).value, null);
    location.reload();
  }

  //This method is to edit or delete the store
  onRightClick(uiId) {
    this.isEdit = true;
    this.mapboxService.getMarkerById(uiId).subscribe((responseData: any[]) => {
      var coordinatesVal = responseData['address'].split(',');
      this.xvalue = coordinatesVal[0];
      this.yvalue = coordinatesVal[1];
      this.storeName = responseData['storeName'];
      this.storeCategory = responseData['category'];
      this.storeDetails = responseData['storeLocation'];
      this.storeId = responseData['id'];
    });
  }

  hideEdit() {
    this.isEdit = false;
  }

  updateMarker(uiStoreName, uiStoreDetails, uiStoreCategory, uiXvalue, uiYvalue, uiStoreId) {
    this.mapboxService.saveMarker(uiStoreName, uiStoreDetails, uiStoreCategory, uiXvalue, uiYvalue, uiStoreId);
    location.reload();
  }

  convertResponseToGeoSon(response) {
    const element = []
    for (let index = 0; index < response.length; index++) {
      var coordinates = response[index].address.split(',');
      element.push({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [coordinates[0], coordinates[1]]
        },
        'properties': {
          'message': response[index].storeName,
        }
      });
      response[index];
    }
    return element;
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