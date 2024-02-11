import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { QUEUE } from './constants';

@Injectable()
export class AppService {
  constructor(@InjectQueue(QUEUE) private sourceQueue: Queue) { }

  async execute(source: string) {
    const job: Job<string> = await this.sourceQueue.add({ source });
    return job.finished();
  }
}
