import { Module } from '@nestjs/common';
import { ConfigModule as CFModule } from '@nestjs/config';
import conf from './conf';

@Module({
  imports: [
    CFModule.forRoot({
      isGlobal: true,
      load: [conf],
    }),
  ],
})
export class ConfigModule {}
