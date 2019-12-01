import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MapboxService {

    constructor(private http: HttpClient) {
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


    getMarkersAPI() {
        return this.http.get(environment.apiTarget + `/store/store/getAll`);

    }
    saveMarker(uiName, uiDetails, uiCategory, xcord, ycord) {

        var marker = {
            "storeName": uiName,
            "storeLocation": uiDetails,
            "address": xcord + ',' + ycord,
            "category": uiCategory
        }

        this.http.post(environment.apiTarget + `/store/store/addStore`, marker).subscribe(
            data => {
                console.log("PUT Request is successful ", data);                
            },
            error => {
                console.log("Error", error);
            }
        );;
    }
}