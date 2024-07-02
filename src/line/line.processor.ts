import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('dynamic')
export class LineProcessor {
  @Process()
  async handleJob(job: Job) {
    console.log(`Processing job ${job.id}`);
    // Lógica de processamento do ticket
  }
}
