import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { Device } from './device';
import { DeviceService } from '../shared/device.service';

@Component({
    moduleId: module.id,
    templateUrl: 'device-detail.component.html'
})
export class DeviceDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Device Detail';
    device: Device;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private _deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = 'DashDemoUnit';//params['id'];
                this.getDevice(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getDevice(id: string) {
        this._deviceService.getDevice(id).subscribe(
            device => this.device = device,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/home']);
    }
/*
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product Detail: ' + message;
    }
    */
}