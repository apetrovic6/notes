import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    // TODO refactor

    // graphql-ws
    if (ctx.req.upgrade === 'websocket') {
      return {
        ...ctx,
        cookies: {
          Authorization: ctx?.req?.cookie?.split('Authorization=')[1],
        },
      };
    }

    // The other one
    if (ctx?.req?.headers?.upgrade === 'websocket') {
      return {
        ...ctx,
        cookies: {
          Authorization: ctx?.headers?.cookie?.split('Authorization=')[1],
        },
      };
    }
    return GqlExecutionContext.create(context).getContext().req;
  }
}
