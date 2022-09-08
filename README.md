

# Notes App

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

Tech stack for this project:

- Nx 
- Postgres
- Redis
- NestJS
- NextJS
- GraphQL

## Nest app is using:

- GraphQL with the Apollo server
- Typeorm as the ORM library
- JWT with httpOnly cookies
- Redis for the GraphQL Subscriptions

## Next app is using:

- Apollo Client for the GraphQL queries and caching
- Mantine components for the UI

## GraphQL

- GraphQL codegen is used to generate Typescript types for the frontend
- Dataloader library is used to eliminate the GraphQL n+1 problem

## Docker 

Currently, only Postgres and Redis are running as containers.


## How to run the project?

```
  git clone https://github.com/apetrovic6/notes.git
  cd notes
  yarn
  yarn start:dev
```
