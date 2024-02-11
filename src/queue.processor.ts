import { Process, Processor } from '@nestjs/bull';
import { QUEUE } from './constants';
import { Job } from 'bull';
import { createContext, runInContext } from 'vm';
import { Logger } from '@nestjs/common';

@Processor(QUEUE)
export class QueueProcessor {
  logger: Logger;

  constructor() {
    this.logger = new Logger(QueueProcessor.name);
    this.logger.log("Started queue processor");
  }

  @Process()
  async execute(job: Job<{ source: string }>) {
    // this.logger.log('Executing:', job.data);

    let timer: NodeJS.Timeout;
    const promise = new Promise<string>((resolve, reject) => {
      timer = setTimeout(() => {
        reject(new Error("Time limit exceeded"));
      }, 5000)

      const logs = [];
      const log = (message: string) => logs.push(message)
      const context = createContext({ console: { log } });
      runInContext(job.data.source, context);
      resolve(logs.join('\n'));
    });

    const result = await promise;
    // clearTimeout(timer);
    return result
  }
}