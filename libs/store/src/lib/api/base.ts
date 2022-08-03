import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient('http://localhost:3333/graphql', {
  credentials: 'include',
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({
    client,
    customErrors: error => {
      const {
        response: { errors },
      } = error;

      // @ts-ignore
      const [
        {
          extensions: { response },
        },
      ] = errors;

      return {
        name: response.error,
        message: response.message,
        stack: response.stack,
      };
    },
  }),
  endpoints: () => ({}),
});
