<<<<<<< HEAD
# zemoz_api
app of tournament for zemoz corpporation
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Todo module structure
TODO
│   todo.module.ts
│
├───use-case
│   ├───add
│   │       add-todo.service.spec.ts
│   │       add.controller.ts
│   │       add.factory.ts
│   │       add.input.dto.ts
│   │       add.interface.ts
│   │       add.service.ts
│   │       create.repository.ts
│   │       index.ts
│   │
│   ├───edit
│   │       edit-todo.service.spec.ts
│   │       edit.controller.ts
│   │       edit.factory.ts
│   │       edit.input.dto.ts
│   │       edit.interface.ts
│   │       edit.todo.service.ts
│   │       index.ts
│   │       update.repository.ts
│   │
│   ├───fetch-all
│   │       all-todo.service.spec.ts
│   │       all.controller.ts
│   │       all.interface.service.ts
│   │       all.service.ts
│   │       find.repository.ts
│   │       index.ts
│   │
│   ├───fetch-one
│   │       fetch-one.repository.ts
│   │       index.ts
│   │       one-todo.service.spec.ts
│   │       one.controller.ts
│   │       one.interface.ts
│   │       one.service.ts
│   │
│   ├───remove
│   │       index.ts
│   │       remove-todo.service.spec.ts
│   │       remove.controller.ts
│   │       remove.interface.ts
│   │       remove.repository.ts
│   │       remove.service.ts
│   │
│   ├───search
│   │       index.ts
│   │       search.controller.ts
│   │       search.interface.ts
│   │       search.repository.ts
│   │       search.service.spec.ts
│   │       search.service.ts
│   │
│   └───set-state
│           index.ts
│           set-state.controller.ts
│           set-state.interface.ts
│           set-state.service.ts
│           set-todo-state.service.spec.ts
│
└───_shared
        doc.todo.dto.ts
        index.ts
        todo.entity.ts
        todo.factory.ts
        todo.model.ts
        todo.repository.module.ts

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Build prod

```bash
# compil
$ yarn build

# generate exe file
$ yarn pkg
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Eslint and Prettier

```bash
# fix lint constraint
$ yarn lint:fix

# format 
$ yarn prettier-format
```

## Launch project

```bash
# create staff admin account
# running this command will create access rules or permissions
$ npx nestjs-command create:rule

# add api-key to any project
$ npx nestjs-command add:key --app THE_PROJECT_ENUM_NAME --key THE_GENERATED_KEY --api THE_API_URL


```

## API documentation
[Launch API documentation](http://127.0.0.1:3001/doc)
## Project documentation
```bash
$ yarn compodoc
```

## Stay in touch

- Author - [TANGUY]()

## License

Nest is [MIT licensed](LICENSE).

>>>>>>> 03ed888184a5ce48c6131081c0ab172117d9ba87
