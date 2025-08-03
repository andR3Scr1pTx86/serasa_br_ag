import { Injectable, Logger } from "@nestjs/common";

import { LoggerPort } from "@core/logger/logger.port";

@Injectable()
export class NestjsLoggerAdapter implements LoggerPort {
  private readonly logger = new Logger(NestjsLoggerAdapter.name);

  info(context: string, message: string): void {
    this.logger.log(`[INFO] [${context}] - ${message}`);
  }

  error(context: string, message: string, trace?: string): void {
    this.logger.error(`[ERROR] [${context}] - ${message}`, trace);
  }

  warn(context: string, message: string): void {
    this.logger.warn(`[WARN] [${context}] - ${message}`);
  }

  debug(context: string, message: string): void {
    this.logger.debug(`[DEBUG] [${context}] - ${message}`);
  }
}