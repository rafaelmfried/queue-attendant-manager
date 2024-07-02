import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as Bull from 'bull';

@Injectable()
export class LineService {
  private queues: { [key: string]: Queue } = {};

  constructor(@InjectQueue('dynamic') private readonly defaultQueue: Queue) {}

  createQueue(name: string) {
    if (!this.queues[name]) {
      this.queues[name] = new Bull(name, {
        redis: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT, 10),
        },
      });
    }
    return { message: `Queue ${name} created` };
  }

  addToQueue(name: string, ticket: any) {
    if (this.queues[name]) {
      this.queues[name].add(ticket);
      return { message: `Ticket added to queue ${name}` };
    } else {
      return { message: `Queue ${name} not found` };
    }
  }

  processQueue(name: string) {
    if (this.queues[name]) {
      this.queues[name].process(async (job) => {
        console.log(`Processing job ${job.id} from queue ${name}`);
        // Lógica de processamento do ticket
      });
      return { message: `Processing queue ${name}` };
    } else {
      return { message: `Queue ${name} not found` };
    }
  }
}
