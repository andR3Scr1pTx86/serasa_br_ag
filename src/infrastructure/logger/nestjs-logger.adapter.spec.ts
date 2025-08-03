import { Logger } from '@nestjs/common';

import { NestjsLoggerAdapter } from './nestjs-logger.adapter';

describe('NestjsLoggerAdapter', () => {
    let adapter: NestjsLoggerAdapter;

    beforeEach(() => {
        adapter = new NestjsLoggerAdapter();

        jest.spyOn(Logger.prototype, 'log').mockImplementation(() => { });
        jest.spyOn(Logger.prototype, 'error').mockImplementation(() => { });
        jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => { });
        jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => { });
    });

    it('should call log from nestjs logger with the correct formatted message for info', () => {
        const logSpy = jest.spyOn(adapter['logger'], 'log');

        const context = 'NestjsLoggerAdapter - it';
        const message = 'testing information message';

        adapter.info(context, message);

        expect(logSpy).toHaveBeenCalledWith(`[INFO] [${context}] - ${message}`);
    });


    it('should call error from nestjs logger with the correct formatted message for error and tracing', () => {
        const errorSpy = jest.spyOn(adapter['logger'], 'error');

        const context = 'NestjsLoggerAdapter - it';
        const message = 'testing error message';
        const trace = 'testing stack trace';

        adapter.error(context, message, trace);

        expect(errorSpy).toHaveBeenCalledWith(`[ERROR] [${context}] - ${message}`, trace);
    });


    it('should call warn from nestjs logger with the correct formatted message for info', () => {
        const warnSpy = jest.spyOn(adapter['logger'], 'warn');

        const context = 'NestjsLoggerAdapter - it';
        const message = 'testing warning message';

        adapter.warn(context, message);

        expect(warnSpy).toHaveBeenCalledWith(`[WARN] [${context}] - ${message}`);
    });


    it('should call debug from nestjs logger with the correct formatted message for info', () => {
        const debugSpy = jest.spyOn(adapter['logger'], 'debug');

        const context = 'NestjsLoggerAdapter - it';
        const message = 'testing debugger message';

        adapter.debug(context, message);

        expect(debugSpy).toHaveBeenCalledWith(`[DEBUG] [${context}] - ${message}`);
    });
});