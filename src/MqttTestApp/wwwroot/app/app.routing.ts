import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DeviceDetailComponent } from './devices/device-detail.component';
import { AWSComponent } from './testAws/aws.component';
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'device', component: DeviceDetailComponent },
    { path: 'awstest', component: AWSComponent },
    { path: 'about', component: AboutComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);