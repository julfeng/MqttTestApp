import { Component, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LogService} from '../messages/logService';
import {RcvMessage} from '../messages/rcvMessage';
import {ConnectOptions} from '../iOT/connectOptions';
import {ClientControllerCache} from '../iOT/clientControllerCache';
import {ClientController} from '../iOT/clientController';
import {MQTTClient} from '../iOT/mqttClient';
@Component({
    moduleId: module.id,
    templateUrl: 'aws.component.html'
})
export class AWSComponent implements OnInit, OnDestroy {
    pageTitle: string = 'AWS Test App';
    endpoint: string;
    regionName: string;
    clientId: string;
    accessKey: string;
    secretKey: string;
    clients: ClientControllerCache;
    logs: LogService;
    connectOptions: ConnectOptions;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private appRef: ApplicationRef) {
        
        
        this.endpoint = 'a327xxxxxxxxxxxxxx.iot.us-east-1.amazonaws.com';//substitute your endpoint you made in the AWS Console.
        this.regionName = 'us-east-1';
        this.accessKey = '<your amazon access key>';
        this.secretKey = '<your amazon secret key>';
        this.clientId = 'AnyClientName';

    }

    ngOnInit(): void {
        this.logs = new LogService();
        this.logs.onTick = () => { this.appRef.tick() };
        //this.logs.log('hello');
        this.connectOptions = new ConnectOptions(this.endpoint, this.regionName, this.accessKey, this.secretKey, this.clientId);
        this.clients = new ClientControllerCache(this.logs);
    }

    ngOnDestroy() {

    }

    subscribe(clientController: ClientController): void {
        if (clientController)
            clientController.subscribe();
    }
    
    createClient(): void {
        var client = this.clients.getClient(this.connectOptions);
        if (!client.connected) {
            client.connect();
            
        }
        //this.appRef.tick();
        //alert('client created' + this.clientId);
    }

    removeClient(clientCtr) : void{
        this.clients.removeClient(clientCtr);
    }

    clearLog(): void {
        this.logs.clear();
    }

    onBack(): void {
        this.router.navigate(['/home']);
    }
}