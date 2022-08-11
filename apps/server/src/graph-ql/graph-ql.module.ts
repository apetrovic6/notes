import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { DataLoaderModule } from '../data-loader/data-loader.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      useFactory: (dataLoaderService: DataLoaderService) => ({
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault],
        autoSchemaFile: true,
        sortSchema: true,
        introspection: true,
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: any) => {
              context.request = { ...context.extra.request.headers };
            },
          },
          'subscriptions-transport-ws': {
            onConnect: (_, ws) => {
              return ws.upgradeReq;
            },
          },
        },
        cors: {
          origin: ['http://localhost:4200', 'https://studio.apollographql.com'],
          credentials: true,
        },
        context: ({ req, res }) => ({
          loaders: dataLoaderService.getLoaders(),
          req,
          res,
        }),
      }),
      inject: [DataLoaderService],
    }),
  ],
  exports: [GraphQLModule],
})
export class GraphQlModule {}
