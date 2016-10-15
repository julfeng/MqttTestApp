import {LogService} from '../messages/logService';
import {ConnectOptions} from './connectOptions';
import { MQTTClient } from './mqttClient'; 
import {ClientController} from './clientController';
export class ClientControllerCache
{
    logService: LogService;
    val: ClientController[];

    constructor(logService: LogService) {
        this.logService = logService;
        this.val = [];
    }

    getClient(options: ConnectOptions) : MQTTClient {
        var id = options.accessKey + '>' + options.clientId + '@' + options.endpoint;
        for (var i = 0; i < this.val.length; i++) {
            var ctr = this.val[i];
            if (ctr.id === id) {
                return ctr.client;
            }
        }
        var client = new MQTTClient(options);
        var clientController = new ClientController(client, this.logService);
        clientController.id = id;
        this.val.push(clientController);
        return client;
    }

    removeClient(clientCtr: ClientController)  : void {
        clientCtr.client.disconnect();
        var index = this.val.indexOf(clientCtr);
        this.val.splice(index, 1);
    };
}