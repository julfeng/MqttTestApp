import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { DeviceDetailComponent } from './devices/device-detail.component';
import { AWSComponent } from './testAws/aws.component';
import { AboutComponent } from './about/about.component';
import { routing, appRoutingProviders } from './app.routing';
import { CharacterService } from './shared/character.service';
import { DeviceService } from './shared/device.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        CharacterService,
        DeviceService
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        DeviceDetailComponent,
        AWSComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }