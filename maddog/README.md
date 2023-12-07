# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Context

UserContext находится в папке src в файле UserContext.js и содержит объект с тестовыми данными (id, role, contacts).
Для использования контекста необходимо импортировать UserContext из UserContext.js, а также useContext из react.
Для получения данных пользователя в компоненте используется хук useContext:
```sh
const user = useContext(UserContext)
```
Доступ к данным пользователя: user.id, user.role, user.contacts.
```sh
console.log('Данные пользователя:', user.id, user.role, user.contacts)
```
Задаём данные пользователя в компоненте App в App.js

## ProjectPage

ProjectPage является страницей, которая отображает список проектов и предоставляет функциональность по их управлению. Содержит в себе filters - массив доступных фильтров проектов. В таблицу ProjectTable через props должны передаваться актуальные фильтры и название проекта для поиска. В строку табицы ProjectRow через props должны передаваться обязательные данные (projectHref, projectName, status, contact, phone, startDate, endDate,
createdDate, creator, note, type, estimateHref), в том числе две ссылки projectHref и estimateHref, ведущие соответственно на страницу проекта и страницу со сметой.