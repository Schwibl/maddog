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

ProjectPage является страницей, которая отображает список проектов и предоставляет функциональность по их управлению. Содержит в себе filters - массив доступных фильтров проектов. В таблицу ProjectTable через props должны передаваться актуальные фильтры и название проекта для поиска. В строку таблицы ProjectRow через props должны передаваться обязательные данные (projectHref, projectName, status, contact, phone, startDate, endDate,
createdDate, creator, note, type, estimateHref), в том числе две ссылки projectHref и estimateHref, ведущие соответственно на страницу проекта и страницу со сметой.

## AdminPage

Использует временно AdminContext - в будущем это будут данные из стейт-менеджера.
Страница стоит из нескольких слоёв:

1. AdminPage
2. AdminTable
3. AdminRow
4. AdminEditor

Самое интересное происходит в AdminRow и AdminEditor. В зависимости от передаваемых данных (особенно - функций), AdminEditor выступает в роли формы для изменения уже 
существующего администратора или в роли формы для добавления нового администратора. 


## Роутинг

Layout’ов  может быть несколько, то есть каждый layout перерисовывать свой компонент в зависимости от пути.

Outlet - это место, куда рендерятся компоненты страницы. Рядом с outlet располагаем одинаковые/повторяющиеся элементы, например, header, footer.

Создаём массив роутов в отдельном файле router.jsx c помощью метода createBrowserRouter:

```sh
const router = createBrowserRouter([ ... ]);
```

Массив роутов состоит из объектов с описанием пути до компонентов.

```sh
 {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/contacts',
        element: <ContactsPage />,
      },
      {
        path: 'estimate/:estimateHref',
        element: <EstimatePage />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  },
```

Первый объект  - это сам компонент <Layout />, расположенный по адресу ‘/‘, далее от этого пути прописываем дочерние роуты.
Также создаем страницу 404, прописываем ее компонент на место любого незарегистрированного роута и на место ошибки при переходе на главную страницу.

Внутри index.js импортируем созданный роутер и вместо корневого компонента прописываем 

```sh
<RouterProvider router={router} />
```

## Redux-toolkit

Файл store.js содержит компонент store - это функция configureStore, предоставленная redux-toolkit, которая хранит в себе общий/корневой редьюсер, также эта функция позволяет использовать инструменты devTools.

```sh
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
```

В файле index.js главный компонент оборачиваем провайдером, который в виде пропсов принимает store.

```sh
<React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
</React.StrictMode>
```

Далее создаем корневой редьюсер - rootReducer.js с помощью функции combineReducers, предоставленной redux-toolkit, которая помогает совмещать в себе все необходимые нам редьюсеры.

```sh
export const rootReducer = combineReducers({
  todoList: todoReducer,
});
```

Далее создаем папку features, в ней файл редьюсера, который обычно имеет название somethingSlice.js. 

Внутри слайс-файла мы указываем начальное состояние компонента.

```sh
const initialState = {
  todos: [],
};
```

Далее создаем сам редьюсер (мутатор состояния) с помощью функции createSlice из пакета redux-toolkit. Внутри редьюсера указываем его имя, передаем initialState (начальное состояние), и создаем функции-редьюсеры (это мпециальные методы, которые имеют доступ к состоянию и могут его менять). Есть редьюсеры, которые имеют доступ к внешнему экшену.

```sh
export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    createAction: (state, action) => {
      const newToDo = {
        id: state.todos.length,
        text: action.payload,
        isDone: false,
      };
      state.todos = [...state.todos, newToDo];
    },
    updateAction: (state, action) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      state.todos = newTodos;
    },
    deleteAction: (state, action) => {
      const newTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      state.todos = newTodos;
    },
  },
});

export const { createAction, updateAction, deleteAction } = todoSlice.actions;

export default todoSlice.reducer;
```
Обратите внимание! Что todoSlice.reducer мы экспортируем, а импортируем под другим названием (обычно сокращают название до todoReducer) в ручную в корневом редьюсере. Затем в файле rootReducer.js, после импорта, внутри функции combineReducer, которая создаем обьект-список из всех наших редьюсеров, прописываем имя редьюсера из файла smthSlice.js и даем ему значение импортированного редьюсера.

```sh
import todoReducer from "./features/ToDoSlice";

export const rootReducer = combineReducers({
  todoList: todoReducer,
});
```

Чтобы обратиться к данным внутри хранилища состояния используем хук useSelector. Он принимает аргументом state и получает определенные данные (по названию обьекта внутри initialState) внутри определенного редьюсера (по его названию).

```sh
const todoList = useSelector((state) => state.todoList.todos);
```

Чтобы использовать нами созданные экшены (методы редьюсера), нужно сначала создать новую сущность dispath. Это вызов хука useDispatch. Далее при вызове dispatch внутрь передаем нужный нам экшн с аргументом, который будет использован для изменения состояния.

```sh
const dispatch = useDispatch();

const createNewToDo = (text) => {
    dispatch(createAction({ text: text}));
  };
```

Далее этот аргумент мы передаем внутрь метода редьюсера с помощью action.payload, и text мы назначили свойством объекта payload text.

```sh
createAction: (state, action) => {
      const newToDo = {
        id: state.todos.length,
        text: action.payload.text,
        isDone: false,
      };
      state.todos = [...state.todos, newToDo];
    },
```## Таблицы AgGrid
### Подключение
Для работы таблицы нужны: 
```
// сама библиотека
import { AgGridReact } from 'ag-grid-react';

// общие стили и отключение линтера на этот импорт
// eslint-disable-next-line import/order, import/no-unresolved   
import 'ag-grid-community/styles/ag-grid.css';
```

### Заголовки таблицы
Заголовки - массив объектов
```
const tableHeader = [
    {
      headerName: 'ФИО',                // что отображается в заголовке таблицы
      field: 'name',                    // id колонки
      flex: 6,                          // ширина колонки относительно других
      resizable: true,                  // возможность менять ширину
      sortable: true,                   // функция сортировки для данных
      // filter: true,                  // обычный фильтр по кнопке
      floatingFilter: true,             // фильтр-поле под названием колонки
      filter: 'agTextColumnFilter',     // тип фильтра - текст
      cellClass: 'vertical-middle',     // дополнительные css свойства 
    }, // заголовки остальных колонок
]

```
!!! И заголовки и тело таблицы лучше хранить и передавать в таблицу через useState

```
const [columnDefs, setColumnDefs] = useState(tableHeader);
```

### Данные в таблице
Данные в таблице - так же массив объектов, который передаётся через useState

### Таблица в DOM 
Таблицу лучше обернуть в div с глобальным стилем 'ag-table'
```
<div className={styles['ag-table']}>
  <AgGridReact
    onCellClicked={cellClickedListener}         // слушатель на случай клика
    rowData={rowData}                           // стейт переменная с данными таблицы
    defaultColDef={{ flex: 1 }}                 // ширина колонки по умолчанию
    pagination={true}                           // опция отображения пагинации внизу таблицы
    columnDefs={columnDefs}                     // стейт переменная с данными заголовков таблицы
    gridOptions={gridOptions}                   // дополнительные опции таблицы
  />
</div>
```

В дополнительные опции таблицы вносится локализация на русском языке:
```
 const gridOptions = {
    localeText: AG_GRID_LOCALE_RU,        // файл локализации лежит в utils 
  };
```