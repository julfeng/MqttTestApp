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
var device_service_1 = require('../shared/device.service');
var DeviceDetailComponent = (function () {
    function DeviceDetailComponent(route, router, _deviceService) {
        this.route = route;
        this.router = router;
        this._deviceService = _deviceService;
        this.pageTitle = 'Device Detail';
    }
    DeviceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = 'DashDemoUnit'; //params['id'];
            _this.getDevice(id);
        });
    };
    DeviceDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    DeviceDetailComponent.prototype.getDevice = function (id) {
        var _this = this;
        this._deviceService.getDevice(id).subscribe(function (device) { return _this.device = device; }, function (error) { return _this.errorMessage = error; });
    };
    DeviceDetailComponent.prototype.onBack = function () {
        this.router.navigate(['/home']);
    };
    DeviceDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'device-detail.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, device_service_1.DeviceService])
    ], DeviceDetailComponent);
    return DeviceDetailComponent;
}());
exports.DeviceDetailComponent = DeviceDetailComponent;
//# sourceMappingURL=device-detail.component.js.map