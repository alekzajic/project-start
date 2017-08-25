# APP (ReactJs Web App)

APP is a React/Redux project built with Webpack 2 & Babel. 

## Project setup and development build

To build development project and start working follow these steps:

* In root of the project run `npm install`
* Run `npm start` in same directory, app will be built in `/dev` directory 
* Access development version of app on [localhost:7777](http://localhost:7777)
 
## Distribution build

TODO

### ESLint 

To fix all fixable eslint rules use `./node_modules/.bin/eslint --fix -c config/eslint.js src/js/`

If it is absolutely necessary and justified to avoid some rule use `// eslint-disable-line NAME-OF-RULE`, 
 `// eslint-disable-next-line NAME-OF-RULE` or for block of code `/*eslint-disable */ /*eslint-enable */`