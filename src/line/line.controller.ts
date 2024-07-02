import { Controller, Post, Body, Param } from '@nestjs/common';
import { LineService } from './line.service';

@Controller('queues')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  @Post()
  createQueue(@Body('name') name: string) {
    return this.lineService.createQueue(name);
  }

  @Post('add')
  addToQueue(@Body('name') name: string, @Body('ticket') ticket: any) {
    return this.lineService.addToQueue(name, ticket);
  }

  @Post('process/:name')
  processQueue(@Param('name') name: string) {
    return this.lineService.processQueue(name);
  }
}
