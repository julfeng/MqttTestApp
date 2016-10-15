"use strict";
var mqttClient_1 = require('./mqttClient');
var clientController_1 = require('./clientController');
var ClientControllerCache = (function () {
    function ClientControllerCache(logService) {
        this.logService = logService;
        this.val = [];
    }
    ClientControllerCache.prototype.getClient = function (options) {
        var id = options.accessKey + '>' + options.clientId + '@' + options.endpoint;
        for (var i = 0; i < this.val.length; i++) {
            var ctr = this.val[i];
            if (ctr.id === id) {
                return ctr.client;
            }
        }
        var client = new mqttClient_1.MQTTClient(options);
        var clientController = new clientController_1.ClientController(client, this.logService);
        clientController.id = id;
        this.val.push(clientController);
        return client;
    };
    ClientControllerCache.prototype.removeClient = function (clientCtr) {
        clientCtr.client.disconnect();
        var index = this.val.indexOf(clientCtr);
        this.val.splice(index, 1);
    };
    ;
    return ClientControllerCache;
}());
exports.ClientControllerCache = ClientControllerCache;
//# sourceMappingURL=clientControllerCache.js.map