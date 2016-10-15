
import {ConnectOptions} from './connectOptions';
import {SigV4Utils} from './sigV4Utils';
declare var Paho: any; // Magic
declare var moment: any;
export class MQTTClient {
    options: ConnectOptions;
    endpoint: string;
    clientId: string;
    name: string;
    connected: boolean;
    client: any;
    listeners: any;
    constructor(options: ConnectOptions) {
        this.options = options;
        this.endpoint = this.computeUrl();
        this.clientId = options.clientId;
        this.name = this.options.clientId + '@' + options.endpoint;
        this.connected = false;


        this.client = new Paho.MQTT.Client(this.endpoint, this.options.clientId);
        this.listeners = {};

        this.client.onConnectionLost = this.onConnectionLost.bind(this);
        this.client.onMessageArrived = this.onMessageArrivedFromAWS.bind(this);
        //this.on('connected', this.onConnected);
    }
    public onConnectionLost = () => {
        this.emit('connectionLost');
        this.connected = false;
    }
    public onMessageArrivedFromAWS = (msg: any) => {
        this.emit('messageArrived', msg);
    }


 /**
 * compute the url for websocket connection
 * private
 *
 * method     MQTTClient#computeUrl
 * return     {string}  the websocket url
 */
    computeUrl () : string {
        // must use utc time
        var time = moment.utc();
        var dateStamp = time.format('YYYYMMDD');
        var amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z';
        var service = 'iotdevicegateway';
        var region = this.options.regionName;
        var secretKey = this.options.secretKey;
        var accessKey = this.options.accessKey;
        var algorithm = 'AWS4-HMAC-SHA256';
        var method = 'GET';
        var canonicalUri = '/mqtt';
        var host = this.options.endpoint;

        var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';
        var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
        canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);
        canonicalQuerystring += '&X-Amz-Date=' + amzdate;
        canonicalQuerystring += '&X-Amz-Expires=86400';
        canonicalQuerystring += '&X-Amz-SignedHeaders=host';

        var canonicalHeaders = 'host:' + host + '\n';
        var payloadHash = SigV4Utils.sha256('');
        var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
        console.log('canonicalRequest ' + canonicalRequest);

        var stringToSign = algorithm + '\n' + amzdate + '\n' + credentialScope + '\n' + SigV4Utils.sha256(canonicalRequest);
        var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
        console.log('stringToSign-------');
        console.log(stringToSign);
        console.log('------------------');
        console.log('signingKey ' + signingKey);
        var signature = SigV4Utils.sign(signingKey, stringToSign);

        canonicalQuerystring += '&X-Amz-Signature=' + signature;
        var requestUrl = 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
        return requestUrl;
    }

   /**
  * listen to client event, supported events are connected, connectionLost,
  * messageArrived(event parameter is of type Paho.MQTT.Message), publishFailed,
  * subscribeSucess and subscribeFailed
  * method     MQTTClient#on
  * param      {string}  event
  * param      {Function}  handler
  */
    on(event: string, handler: (msg: any) => any): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(handler);
    }
   /** emit event
   *
   * method MQTTClient#emit
   * param {string}  event
   * param {...any} args - event parameters
   */
    emit(event: string, msg?: any): void {
        var listeners = this.listeners[event];
        if (listeners) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener.apply(null, args);
            }
        }
    }

    /**
     * connect to AWS, should call this method before publish/subscribe
     * method MQTTClient#connect
     */
    connect(): void {
        var self = this;
        var connectOptions = {
            onSuccess: function () {
                self.emit('connected');
            },
            useSSL: true,
            timeout: 3,
            mqttVersion: 4,
            onFailure: function (e) {
                self.emit('connectionLost');
            }
        };
        this.client.connect(connectOptions);
    };

    /**
     * disconnect
     * method MQTTClient#disconnect
     */
    disconnect(): void {
        try {
            this.client.disconnect();
        } catch(e) {
            this.emit('connectionLost' + e);
        }
    };

    /**
     * publish a message
     * method     MQTTClient#publish
     * param      {string}  topic
     * param      {string}  payload
     */
    publish (topic, payload) : void {
        try {
            var message = new Paho.MQTT.Message(payload);
            message.destinationName = topic;
            this.client.send(message);
        } catch (e) {
            this.emit('publishFailed');
        }
    }

    /**
     * subscribe to a topic
     * method     MQTTClient#subscribe
     * param      {string}  topic
     */
    subscribe(topic): void {
        var self = this;
        try {
            this.client.subscribe(topic, {
                onSuccess: function () {
                    self.emit('subscribeSucess');
                },
                onFailure: function () {
                    self.emit('subscribeFailed');
                }
            });
        } catch (e) {
            this.emit('subscribeFailed');
        }

    }

}