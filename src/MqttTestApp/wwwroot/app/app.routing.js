"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var about_component_1 = require('./about/about.component');
var device_detail_component_1 = require('./devices/device-detail.component');
var aws_component_1 = require('./testAws/aws.component');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'device', component: device_detail_component_1.DeviceDetailComponent },
    { path: 'awstest', component: aws_component_1.AWSComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map