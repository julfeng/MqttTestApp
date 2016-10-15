"use strict";
var ConnectOptions = (function () {
    function ConnectOptions(ep, rn, ak, sk, cid) {
        this.endpoint = ep;
        this.regionName = rn;
        this.accessKey = ak;
        this.secretKey = sk;
        this.clientId = cid;
    }
    return ConnectOptions;
}());
exports.ConnectOptions = ConnectOptions;
//# sourceMappingURL=connectOptions.js.map