# Recruiter App FrontEnd

- [Getting started](#getting-started)
- [Folder structure](#folder-structure)
- [Development process](#development-process)
- [CI/CD](#cicd)
- [Github hooks](#git-hooks)

## Getting started

**Local configs**:

- Application url: http://localhost:8081

To start working with Recruiter Frontend App you have to:

1. Clone the repository to your local workspace folder.<br>

```
git clone https://gitlab.com/techmagic-tc-10/tc-tool-fe.git
```

2. Run the next command:

```
npm install
```

3. After `npm install` the following should happen:

- Packages will have been installed.
- [Husky](https://github.com/typicode/husky) will have been installed.

4. Run the next command to start application:

```
npm start
```

## Folder structure
We use domain driven structure for directories. It means that every domain will have own folder with the defined structure. See an example: 
- `vacancies` - Domain folder
  - `components` - Folder contains components
  - `models` - Folder contains interfaces, models, enums etc.
  - `services` - Folder contains services
  - `vacancies.module.ts` - Main module with components declaration and service providers etc.
  - `vacancies-routing.module.ts` - Routing module that is used for lazy loading.

## Development process

![development_process](https://i.ibb.co/xSb6QsF/front-process.png)

## CI/CD

![cicd](https://i.ibb.co/6W8DzZm/frontend-ci-cd.png)

## Git hooks

The following git hooks are set up:

- The `pre-commit` hook runs `npx lint-staged` and `npm run lint` commands to format your code before committing the changes. Formatting is
  based on rules in [.prettierrc.json](https://gitlab.com/techmagic-tc-10/tc-tool-fe/-/blob/main/.prettierrc.json)
  and [.eslintrc.json](https://gitlab.com/techmagic-tc-10/tc-tool-fe/-/blob/main/.eslintrc.json) files.
- The `pre-push` hook runs `ng build --configuration production` command to build angular application and verify that it works successfully.
