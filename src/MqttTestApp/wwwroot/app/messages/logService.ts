import {Injectable} from '@angular/core';
import {LogMsg} from '../messages/logMsg';
//@Injectable()
export class LogService {
    public logMessages: LogMsg[];
    onTick: () => any;
    constructor() {
        this.logMessages = [];
    }

    log(msg: string): void {
        var logMessage = new LogMsg('success', msg);
        this.logMessages.push(logMessage);
        if (this.onTick)
            this.onTick();
    }

    logError(msg: string): void {
        var logMessage = new LogMsg('error', msg);
        this.logMessages.push(logMessage)
    }
    clear(): void {
        this.logMessages = [];
    }
}