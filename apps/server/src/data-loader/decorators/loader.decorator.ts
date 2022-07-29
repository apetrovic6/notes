import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Takes a string name of a desired loader.
export const Loader = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const [, , { loaders }] = ctx.getArgs();

    return loaders[data];
  }
);
