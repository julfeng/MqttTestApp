"use strict";
/**
 * wrapper of received paho message
 * class
 * param {Paho.MQTT.Message} msg
 */
var RcvMessage = (function () {
    function RcvMessage(msg) {
        this.msg = msg;
        this.content = msg.payloadString;
        this.destination = msg.destinationName;
        this.receivedTime = Date.now();
    }
    return RcvMessage;
}());
exports.RcvMessage = RcvMessage;
//# sourceMappingURL=rcvMessage.js.map