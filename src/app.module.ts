import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExecModule } from './exec/exec.module';

@Module({
  imports: [ExecModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
