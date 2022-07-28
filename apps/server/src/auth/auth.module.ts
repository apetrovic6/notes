import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthHelpersModule } from '@notes/auth-helpers';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthHelpersModule, UserModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
