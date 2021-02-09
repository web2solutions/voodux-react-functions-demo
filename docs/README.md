<img src="https://i.imgur.com/614mA0U.png" width="200" />

# React Demo App - Functions based components

This is a React application demo leveraging the [voodux](https://github.com/web2solutions/voodux).

`This demo is totaly built using React functional components`

`This demo is built using Material UI.`

`This project was NOT bootstrapped with Create React App.`

### Project Structure

```bash
├── dist                          -> Final app code goes here
├── docs
│ ├── code                        -> JSDoc documentation will be saved here
│ └── reports                     -> Karma reports will be saved here
├── html_app                      -> Original static files
├── test                          -> Test suites goes here
├── src
│   ├── components
│   │   ├── customers
│   │   │   ├── CustomersAdd.js   -> Add form
│   │   │   ├── CustomersEdit.js  -> Edit form
│   │   │   ├── index.js          -> Main listing page
│   │   │   └── events            -> Event Handlers decoupled from component files
│   │   ├── dashboard
│   │   │   ├── Chart.js          -> Finance Chart
│   │   │   ├── index.js          -> Main listing page
│   │   │   └── events            -> Event Handlers decoupled from component files
│   │   ├── orders
│   │   │   ├── OrdersAdd.js      -> Add form
│   │   │   ├── index.js          -> Main listing page
│   │   │   └── events            -> Event Handlers decoupled from component files
│   │   ├── products
│   │   │   ├── ProductsAdd.js    -> Add form
│   │   │   ├── ProductsEdit.js   -> Edit form
│   │   │   ├── index.js          -> Main listing page
│   │   │   └── events            -> Event Handlers decoupled from component files
│   ├── events                    -> Decoupled Application Event handlers
│   ├── schemas                   -> Data Entity Schemas (or Data Models) are saved here
│   ├── App.css
│   ├── App.js                    -> React Application code
│   └── main.js                   -> Application entry point
├── test
├── .babelrc                      -> Babel configuration
├── .editorconfig                 -> Some code standards on IDE
├── .eslintignore                 -> eslint ignore rules
├── .eslintrc.json                -> eslint configuration
├── .prettierrc                   -> prettier configuration
├── jsDoc.json                    -> JSDoc configuration
├── package.json
├── server.js                     -> express serving /dist content
└── webpack.config.js              -> webpack configuration
```

## Links

- [Code Documentation of this demo](https://web2solutions.github.io/voodux-react-functions-demo/code/index.html)

- [Unit tests Report](https://web2solutions.github.io/voodux-react-functions-demo/reports/unit-testing/index.html)

- [voodux Code documentation](https://web2solutions.github.io/voodux/code/index.html)

- [voodux Project](https://github.com/web2solutions/voodux)
