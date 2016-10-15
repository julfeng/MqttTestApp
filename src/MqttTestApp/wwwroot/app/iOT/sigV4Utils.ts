declare var CryptoJS: any;
export class SigV4Utils {

    static sign(key : string, msg : string): string {
        var hash = CryptoJS.HmacSHA256(msg, key);
        return hash.toString(CryptoJS.enc.Hex);
    }

    static sha256 (msg) :string {
        var hash = CryptoJS.SHA256(msg);
        return hash.toString(CryptoJS.enc.Hex);
    }

    static getSignatureKey (key, dateStamp, regionName, serviceName) : string {
        var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
        var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
        var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
        var kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
        return kSigning;
    };
}