"use strict";
var logMsg_1 = require('../messages/logMsg');
//@Injectable()
var LogService = (function () {
    function LogService() {
        this.logMessages = [];
    }
    LogService.prototype.log = function (msg) {
        var logMessage = new logMsg_1.LogMsg('success', msg);
        this.logMessages.push(logMessage);
        if (this.onTick)
            this.onTick();
    };
    LogService.prototype.logError = function (msg) {
        var logMessage = new logMsg_1.LogMsg('error', msg);
        this.logMessages.push(logMessage);
    };
    LogService.prototype.clear = function () {
        this.logMessages = [];
    };
    return LogService;
}());
exports.LogService = LogService;
//# sourceMappingURL=logService.js.map