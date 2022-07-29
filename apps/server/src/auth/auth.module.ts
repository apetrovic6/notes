import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthHelpersModule } from '@notes/auth-helpers';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [AuthHelpersModule, UserModule],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
