  /**
   * wrapper of received paho message
   * class
   * param {Paho.MQTT.Message} msg
   */
export class RcvMessage {
    public msg: any;
    public content: string;
    public destination: string;
    public receivedTime: number;
    constructor(msg: any) {
        this.msg = msg;
        this.content = msg.payloadString;
        this.destination = msg.destinationName;
        this.receivedTime = Date.now();
    }
}