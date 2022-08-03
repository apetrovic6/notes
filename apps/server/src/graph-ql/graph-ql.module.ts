import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { DataLoaderModule } from '../data-loader/data-loader.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      useFactory: (dataLoaderService: DataLoaderService) => ({
        autoSchemaFile: true,
        sortSchema: true,
        introspection: true,
        cors: {
          origin: 'http://localhost:4200',
          credentials: true,
        },
        context: () => ({
          loaders: dataLoaderService.getLoaders(),
        }),
      }),
      inject: [DataLoaderService],
    }),
  ],
  exports: [GraphQLModule],
})
export class GraphQlModule {}
