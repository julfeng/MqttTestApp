import {LogService} from '../messages/logService';
import {MQTTClient } from './mqttClient';
import {RcvMessage} from '../messages/rcvMessage';
export class ClientController {
    client: MQTTClient;
    topicName: string;
    message: string;
    logService: LogService;
    msgs: RcvMessage[];
    id: string;
    constructor(client: MQTTClient, logs: LogService) {
        this.client = client;
        this.msgs = [];

        this.topicName = 'DashDemoUnit/Data';
        this.logService = logs;

        this.client.on('connectionLost', this.onConnectionLost.bind(this));
        this.client.on('messageArrived', this.onMessageArrived.bind(this));
        this.client.on('connected', this.onConnected.bind(this));
        this.client.on('subscribeFailed', this.onSubscribeFailed.bind(this));
        this.client.on('subscribeSucess', this.onSubscribeSuccess.bind(this));
        this.client.on('publishFailed', this.onPublishFailed.bind(this));
    }
    onConnectionLost = () =>{
        this.logService.logError('Connection lost');
    }
    onMessageArrived = (msg: any) => {
        this.logService.log('messageArrived in ' + this.id);
        this.msgs.push(new RcvMessage(msg));
    }
    onConnected = () => {
        this.client.connected = true;
        this.logService.log('connected');
    }
    onSubscribeFailed = () => {
        this.logService.logError('subscribeFailed');
    }
    onSubscribeSuccess = () => {
        this.logService.log('subscribeSucess');
    }
    onPublishFailed = () => {
        this.logService.log('publishFailed');
    }
    subscribe = () => {
        this.client.subscribe(this.topicName);
    }

    publish = () => {
        this.client.publish(this.topicName, this.message);
    };

    msgInputKeyUp ($event)  : void {
        if ($event.keyCode === 13) {
            this.publish();
        }
    }

  }

