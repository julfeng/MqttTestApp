"use strict";
var rcvMessage_1 = require('../messages/rcvMessage');
var ClientController = (function () {
    function ClientController(client, logs) {
        var _this = this;
        this.onConnectionLost = function () {
            _this.logService.logError('Connection lost');
        };
        this.onMessageArrived = function (msg) {
            _this.logService.log('messageArrived in ' + _this.id);
            _this.msgs.push(new rcvMessage_1.RcvMessage(msg));
        };
        this.onConnected = function () {
            _this.client.connected = true;
            _this.logService.log('connected');
        };
        this.onSubscribeFailed = function () {
            _this.logService.logError('subscribeFailed');
        };
        this.onSubscribeSuccess = function () {
            _this.logService.log('subscribeSucess');
        };
        this.onPublishFailed = function () {
            _this.logService.log('publishFailed');
        };
        this.subscribe = function () {
            _this.client.subscribe(_this.topicName);
        };
        this.publish = function () {
            _this.client.publish(_this.topicName, _this.message);
        };
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
    ClientController.prototype.msgInputKeyUp = function ($event) {
        if ($event.keyCode === 13) {
            this.publish();
        }
    };
    return ClientController;
}());
exports.ClientController = ClientController;
//# sourceMappingURL=clientController.js.map