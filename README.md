<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

# Description

Technical interview for AppSolute in NestJs

# Installation

## Docker

Edit

```bash
.env.docker.example
```

&

```bash
.env.example
```

with necessary values, and rename them to

```bash
.env.docker
```

&

```bash
.env
```

#### NOTE: Be careful to fill in the same values for both environments

Finally:

```bash
$ docker-compose up --build
```

## Without docker

Make sure to have a Redis service and an appropriately named mysql database created, with appropriate values registered
in the .env file

Install dependencies:

```bash
$ npm ci
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
$ npm run test
```

or

```bash
$ npm run test:watch 
```

for test watching(be wary of the number of times the tests query the external NewsAPI, especially if you have a limited
account)

# Querying the app

The app runs on

```bash
http://localhost:${PORT}
```

The endpoint routes, body fields and types are documented at:

```bash
http://localhost:${PORT}/api
```

## Notable choices

The insertion of articles in the database are done in a job queue, to the least for the client to get a quick response,
but mostly in prevention of eventual request time outs.

The @nestjs/Bull queue library is used to roll out this feature

## Support

Contact me at : dev.xavier.francois@gmail.com
