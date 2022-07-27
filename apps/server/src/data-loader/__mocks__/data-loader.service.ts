import { fn } from 'jest-mock';

export const DataLoaderService = fn().mockReturnValue({
  getLoaders: fn().mockReturnValue(dummy => {
    dummy;
  }),
});
