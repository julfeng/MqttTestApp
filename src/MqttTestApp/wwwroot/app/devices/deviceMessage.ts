import {LeakTestResult} from './result';

export class DeviceMessage {
    testBatch : string;
    testerId : string;
    testTime : Date;
    config : string;
    adcSampleRateMs : number;
    zero : number[];
    measure : number[];
    result : LeakTestResult;
}
