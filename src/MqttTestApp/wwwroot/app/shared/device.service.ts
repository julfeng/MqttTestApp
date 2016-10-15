import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Device } from '../devices/device';



@Injectable()
export class DeviceService {
    private _deviceUrl = 'api/device';
    private _awsDevice : any;
    constructor(private _http: Http) {
    }

    getDevices(): Observable<Device[]> {
        return this._http.get(this._deviceUrl)
            .map((response: Response) => <Device[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDevice(id: string): Observable<Device> {
        return this.getDevices()
            .map((devices: Device[]) => devices.find(d => d.deviceId === id));
    }

    receiveMsg(): void {

    }
    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}