export class ConnectOptions {
    endpoint: string;
    regionName: string;
    accessKey: string;
    secretKey: string;
    clientId: string;
    constructor(ep: string, rn: string, ak : string, sk: string, cid : string) {
        this.endpoint = ep;
        this.regionName = rn;
        this.accessKey = ak;
        this.secretKey = sk;
        this.clientId = cid;
    }
}