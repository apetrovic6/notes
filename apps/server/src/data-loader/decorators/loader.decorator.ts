import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Loader = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const [, , { loaders }] = ctx.getArgs();

    return loaders[data];
  }
);
