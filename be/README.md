# Recruiter App Backend

- [Getting started](#getting-started)
- [Folder structure](#folder-structure)
- [Files naming convention](#files-naming-convention)
    - [Controllers](#controllers)
    - [Models](#models)
    - [Routes](#routes)
    - [Repositories](#repositories)
    - [Services](#services)
- [Architecture](#architecture)
- [Development process](#development-process)
- [CI/CD](#cicd)
- [Github hooks](#git-hooks)
- [Usage](#usage)
    - [Utils](#utils)
    - [Environment variables management](#environment-variables-management)
    - [API Documentation](#api-documentation)
    - [Request payload validation](#request-payload-validation)
    - [Error handling](#error-handling)
- [Useful info](#useful-info)
    - [Setup MongoDB database](#setup-mongodb-database)

## Getting started

> **Important:** You should have preinstalled MongoDB database on your loca machine before starting the backend application. Be sure that the mongodb server runs on port **27017**. [**Read more about how to setup MongoDB**](#setup-mongodb-database).

**Local configs**:

- Database url: mongodb://localhost:27017/
- Database name: recruiterdb
- Server url: http://localhost:8082

To start working with Recruiter Backend App you have to:

1. Clone the repository to your local workspace folder.<br>

```
git clone https://gitlab.com/techmagic-tc-10/tc-tool-be.git
```

2. Run the next command:

```
npm install
```

3. After `npm install` the following should happen:

- Packages will have been installed.
- [Husky](https://github.com/typicode/husky) will have been installed.

4. Run the next command to start server:

```
npm start
```

The expected output:

```
...
[nodemon] starting `node index.js`
Server is up and running on port number 8082
Mongoose connection is CONNECTED
```

## Folder structure

- `.husky` - Folder contains [git hooks](#git-hooks).
- `config` - Folder contains configuration files for different envs. Read more
  about [environment variables management](#environment-variables-management).
- `controllers` - Folder contains controllers. Read more about [API documentation](#api-documentation).
- `docs` - Folder contains documentation files generated by [`apidoc`](https://apidocjs.com/#install).
- `middlewares` - Folder contains middlewares.
- `models` - Folder contains mongoose models.
- `repositories` - Folder contains repositories to work with database (e.q. `findOne`, `create` etc.).
- `routes` - Folder contains routes to link requests to controllers.
- `scripts` - Folder contains deployment scripts used
  by [AWS CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html).
- `services` - Folder contains services with business logic.
- `utils` - Folder contains utils like `error` or `joi`.<br>
- `.eslintrc.json` - File contains [`eslint` rules](https://eslint.org/docs/rules/) for code formatting.
- `.gitlab-ci.yml` - File describes stages for Gitlab CI/CD.
- `.prettierrc.json` - File contains [`prettier` rules](https://prettier.io/docs/en/options.html) for code formatting.
- `apidoc.json` - File contains rules for apidoc package.
- `app.js` - File contains base middlewares and base routing.
- `appspec.yml` - File describes stages for AWS CodeDeploy. Read more
  about [`appspec.yml` structure](https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure.html)
  .
- `index.js` - File is entry point
- `package.json` - Folder describes dependencies

## Files naming convention

### Controllers

Name your controller file based on domain. For example, `vacancies.controller.js`.

### Models

Name your model file based on domain. For example, `vacancies.model.js`.

### Routes

Name your router file based on domain. For example, `vacancies.routes.js`.

### Repositories

Name your repository file based on domain. For example, `vacancies.repository.js`.<br>
There is the base repository with base methods (e.q. `create`, `findOne`, `updateOne` etc.). You can use it to create
repository for the model.

```
class VacanciesRepository extends BaseRepository {
  constructor() {
    super(Vacancies);
  }
}
```

### Services

To implement a new service you have to create a folder and two files, the first one is for business logic and the second
one is for payload validation. For example, you want to create services for vacancies. You have to follow the next
steps:

1. Create folder with name `vacancies`.
2. Create two files in the folder from step #1.

- `vacancies.service.js` - Describe business logic for vacancies (create vacancy, update vacancy, list all vacancies).
- `vacancies.validate.js` - Describe Joi validation schemes in this service.

## Architecture

![architecture](https://garywoodfine.com/wp-content/uploads/2017/01/RepositoryPattern.png)

## Development process

![development_process](https://i.ibb.co/QYKNwPM/Developeing-Process.png)

## CI/CD

![cicd](https://i.ibb.co/6bS1X3d/CICD.png)

## Git hooks

The following git hooks are set up:

- The `pre-commit` hook runs `npx lint-staged` command to format your code before commiting the changes. Formatting is
  based on rules in [.prettierrc.json](https://gitlab.com/techmagic-tc-10/tc-tool-be/-/blob/main/.prettierrc.json)
  and [.eslintrc.json](https://gitlab.com/techmagic-tc-10/tc-tool-be/-/blob/main/.eslintrc.json) files.

## Usage

### Utils

The utils are defined globally. So you can use them in the following way:

```
Utils.Error.badRequest(...)
```

***

### Environment variables management

There is [`config` folder](https://gitlab.com/techmagic-tc-10/tc-tool-be/-/tree/main/config) with diffent env files (
e.q. `default.json`, `production.json`). You can store different configurations (for firebase, server or database) in
those files. To get some variable you can use the following code:

```
const config = require('config');
const srv = config.get('path.to.variable'); // For example, 'database.srv'.
```

> Read more about [the `config` package](https://github.com/lorenwest/node-config).
***

### API Documentation

> **Important:** You have write documentation for your API routes to make it easier for testing. To update API documentation run the following command:

```
npm run docs
```

> Read more about [`apidoc`](https://apidocjs.com/#install).

Here is an example of documented route:

```
/**
 * @api {get} /vacancies Get all vacancies
 * @apiName ListVacancies
 * @apiDescription This route allows to list all vacancies.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/
 *
 * @apiSuccess {Array} vacancies Vacancies array.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id": "6192fed468bdd05ad4618292",
 *        "name": "Test vacancy name",
 *        "description": "Test vacancy description",
 *        "link": "https://www.example.com",
 *        "createdAt": "2021-11-16T00:44:04.392Z",
 *        "updatedAt": "2021-11-16T00:44:04.392Z"
 *      },
 *      ...
 *     ]
 *
 * @apiUse VacanciesBase
 */
async function getList(req, res, next) {
  try {
    const vacancies = await vacanciesService.getList();

    res.json(vacancies);
  } catch (e) {
    next(e);
  }
}
```

***

### Request payload validation

Before processing request payload you have to validate it using joi schema. Here is an example:

File `service.js`:

```
async createVacancy(payload) {
    const data = await validateCreateVacancy(payload); // !!! Validate the payload

    return vacanciesRepository.create(data);
}
...
```

File `service.validate.js`:

```
function validateCreateVacancy(payload) {
  const schema = Joi.object({
    name: Joi.string().min(0).max(200).required(),
    description: Joi.string().min(0).max(800).required(),
    link: Joi.string().uri().optional()
  });

  return Utils.Joi.validate(schema, payload);
}
...
```

> Read more about [`joi` validation](https://joi.dev/api/?v=17.4.2).
***

### Error handling

For controled error handling you can
use [`error`](https://gitlab.com/techmagic-tc-10/tc-tool-be/-/blob/main/utils/error.js) util.

Here is an example:

```
...
if (!user) {
    throw Utils.Error.badRequest('User not found', 'user.not_found');
}
...
```

## Useful info

### Setup MongoDB database

There are few ways to run MongoDB database on your local machine:

1. [Install MongoDB manually](https://docs.mongodb.com/manual/installation/)
2. Install MongoDB using Docker
    - [Install Docker](https://www.docker.com/products/docker-desktop)
    - [Run MongoDB container in Docker](https://www.mongodb.com/compatibility/docker)

***

