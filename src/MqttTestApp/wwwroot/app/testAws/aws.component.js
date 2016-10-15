"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var logService_1 = require('../messages/logService');
var connectOptions_1 = require('../iOT/connectOptions');
var clientControllerCache_1 = require('../iOT/clientControllerCache');
var AWSComponent = (function () {
    function AWSComponent(route, router, appRef) {
        this.route = route;
        this.router = router;
        this.appRef = appRef;
        this.pageTitle = 'AWS Test App';
        this.endpoint = 'a327xxxxxxxxxxxxxx.iot.us-east-1.amazonaws.com'; //substitute your endpoint you made in the AWS Console.
        this.regionName = 'us-east-1';
        this.accessKey = '<your amazon access key>';
        this.secretKey = '<your amazon secret key>';
        this.clientId = 'AnyClientName';
    }
    AWSComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logs = new logService_1.LogService();
        this.logs.onTick = function () { _this.appRef.tick(); };
        //this.logs.log('hello');
        this.connectOptions = new connectOptions_1.ConnectOptions(this.endpoint, this.regionName, this.accessKey, this.secretKey, this.clientId);
        this.clients = new clientControllerCache_1.ClientControllerCache(this.logs);
    };
    AWSComponent.prototype.ngOnDestroy = function () {
    };
    AWSComponent.prototype.subscribe = function (clientController) {
        if (clientController)
            clientController.subscribe();
    };
    AWSComponent.prototype.createClient = function () {
        var client = this.clients.getClient(this.connectOptions);
        if (!client.connected) {
            client.connect();
        }
        //this.appRef.tick();
        //alert('client created' + this.clientId);
    };
    AWSComponent.prototype.removeClient = function (clientCtr) {
        this.clients.removeClient(clientCtr);
    };
    AWSComponent.prototype.clearLog = function () {
        this.logs.clear();
    };
    AWSComponent.prototype.onBack = function () {
        this.router.navigate(['/home']);
    };
    AWSComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'aws.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, core_1.ApplicationRef])
    ], AWSComponent);
    return AWSComponent;
}());
exports.AWSComponent = AWSComponent;
//# sourceMappingURL=aws.component.js.map