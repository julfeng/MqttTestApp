"use strict";
var LogMsg = (function () {
    function LogMsg(_type, _content) {
        this.type = _type;
        this.content = _content;
        this.createdTime = Date.now();
        if (this.type === 'success') {
            this.className = 'list-group-item-info';
        }
        else {
            this.className = 'list-group-item-danger';
        }
    }
    return LogMsg;
}());
exports.LogMsg = LogMsg;
//# sourceMappingURL=logMsg.js.map