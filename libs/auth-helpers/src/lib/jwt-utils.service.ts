import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, of } from 'rxjs';

@Injectable()
export class JwtUtilsService {
  constructor(private readonly jwt: JwtService) {}

  sign(userId: string) {
    return from(this.jwt.signAsync({ sub: userId }));
  }

  verify(token: string) {
    return from(this.jwt.verifyAsync(token));
  }

  decode(token: string) {
    return from(of(this.jwt.decode(token)));
  }
}
