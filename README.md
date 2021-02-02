#   <img src="https://avatars3.githubusercontent.com/u/14809007?s=280&v=4" width="50" /> Agnostic Web Foundation - React Demo

React application demo leveraging the [Agnostic Web Foundation](https://github.com/web2solutions/agnostic-web-foundation) as underlying architecture.

This demo focus on `React functional components`.

It uses [Material UI](https://material-ui.com/) as UI framework.


`This project was NOT bootstrapped with Create React App.`


### Demo app

[Check the online demo](https://agnostic-web-foundation-react-functions-demo.vercel.app/)


<img src="https://i.imgur.com/b29Lsgj.png" width="300" />

<img src="https://i.imgur.com/bBaDsWx.png" width="300" />

<img src="https://i.imgur.com/wGkQgmK.png" width="300" />



### Agnostic Web Foundation Docs

[Project](https://github.com/web2solutions/agnostic-web-foundation)


[Code Documentation](https://web2solutions.github.io/agnostic-web-foundation/)



### Code automation tools


- `npm run start:dev`

  Starts the dev server at 5490 port

- `npm run build`

  Build the application inside `dist/` folder

  1. Runs `npm run lint`
  2. Runs `npm run webpack`

- `npm run doc`

  Generates the code documentation using JSDoc

- `npm run lint`

  Runs lint against the code at src/ folder

- `npm run eslint-fix`

  Runs eslint --fix against the code at src/ folder

- `npm run format-code`

Runs prettier-eslint --write against the code at src/ folder

- `npm run webpack`

Transpile the es6 code (src/) to es5 version at dist/ folder
