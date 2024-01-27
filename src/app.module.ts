import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExecModule } from './exec/exec.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [ExecModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
