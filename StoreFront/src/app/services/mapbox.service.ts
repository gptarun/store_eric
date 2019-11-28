import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
    providedIn: 'root'
})
export class MapboxService {

    constructor() {
        mapboxgl.accessToken = environment.mapbox.accessToken;
    }

    getMarkers() {
        const geoJson = [{
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': ['77.35551317307323', '12.955875032767892']
            },
            'properties': {
                'message': 'Location 1'
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': ['77.43821630896224', '12.961183230838344']
            },
            'properties': {
                'message': 'Location 2'
            }
        }];
        return geoJson;
    }
}