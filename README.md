Pricepinmap Application
=======================
Mapping application for property sales data


Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Features
--------

* [React](https://github.com/facebook/react) (`^0.14.0`)
  * Includes react-addons-test-utils (`^0.14.0`)
* [Redux](https://github.com/rackt/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-devtools
    * use `npm run dev:nw` to display them in a separate window.
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^2.0.0`)
* [react-router-redux](https://github.com/rackt/react-router-redux) (`^3.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * [CSS modules!](https://github.com/css-modules/css-modules)
  * sass-loader
  * postcss-loader with cssnano for style autoprefixing and minification
  * Bundle splitting for app and vendor dependencies
  * CSS extraction during builts that are not using HMR (like `npm run compile`)
  * Loaders for fonts and images
* [Koa](https://github.com/koajs/koa) (`^2.0.0-alpha`)
  * webpack-dev-middleware
  * webpack-hot-middleware
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ chai, sinon-chai, and chai-as-promised
  * [Airbnb's Enzyme](https://github.com/airbnb/enzyme) with [chai-enzyme](https://github.com/producthunt/chai-enzyme)
  * PhantomJS
  * Code coverage reports
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined
  * [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre) for:
    * react-transform-hmr (HMR for React components)
    * redbox-react (visible error reporting for React components)
  * [babel-plugin-transform-react-constant-elements](https://babeljs.io/docs/plugins/transform-react-constant-elements/) save some memory allocation
  * [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) remove `PropTypes`
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this!
  * Includes separate test-specific `.eslintrc` to support chai assertions

Getting Started
---------------

```shell
$ npm install                   # Install Node modules listed in ./package.json
$ npm start                     # Compile and launch
```

Usage
-----

* `npm start` - Spins up Koa server to serve your app at `localhost:3000`. HMR will be enabled in development.
* `npm run compile` - Compiles the application to disk (`~/dist` by default).
* `npm run dev` - Same as `npm start`, but enables nodemon to automatically restart the server when server-related code is changed.
* `npm run dev:nw` - Same as `npm run dev`, but opens the redux devtools in a new window.
* `npm run dev:no-debug` - Same as `npm run dev` but disables redux devtools.
* `npm run test` - Runs unit tests with Karma and generates a coverage report.
* `npm run test:dev` - Runs Karma and watches for changes to re-run tests; does not generate coverage reports.
* `npm run deploy`- Runs linter, tests, and then, on success, compiles your application to disk.
* `npm run lint`- Lint all `.js` files.
* `npm run lint:fix` - Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).

### Configuration

Basic project configuration can be found in `~/config/_base.js`.

Common configuration options:

* `dir_src` - application source code base path
* `dir_dist` - path to build compiled application to
* `server_host` - hostname for the Koa server
* `server_port` - port for the Koa server
* `compiler_css_modules` - whether or not to enable CSS modules
* `compiler_devtool` - what type of source-maps to generate (set to `false`/`null` to disable)
* `compiler_vendor` - packages to separate into to the vendor bundle

Structure
---------

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── components           # Generic React Components (generally Dumb components)
│   ├── containers           # Components that provide context (e.g. Redux Provider)
│   ├── layouts              # Components that dictate major page structure
│   ├── redux                # Redux-specific pieces
│   │   ├── modules          # Collections of reducers/constants/actions
│   │   └── utils            # Redux-specific helpers
│   ├── routes               # Application route definitions
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── views                # Components that live at a route
│   └── main.js              # Application bootstrap and rendering
└── tests                    # Unit tests
```
Webpack
-------

### Vendor Bundle
We can redefine which packages to bundle separately by modifying `compiler_vendor` in `~/config/_base.js`. These default to:

```js
[
  'history',
  'react',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
]
```

### Webpack Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js

// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available anywhere in source code.

* `process.env.NODE_ENV` - the active `NODE_ENV` when the build started
* `__DEV__` - True when `process.env.NODE_ENV` is `development`
* `__PROD__` - True when `process.env.NODE_ENV` is `production`
* `__TEST__` - True when `process.env.NODE_ENV` is `test`
* `__DEBUG__` - True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)
* `__BASENAME__` - [npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)

```

Testing
-------

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them.

Coverage reports will be compiled to `~/coverage` by default.

> ### Want Semicolons?
> After installing npm dependencies, open `.eslintrc`, change the `semi` rule from `never` to `always`, and then run `npm run lint:fix` -- Alternatively, use the same npm script after installing and extending your preferred ESLint configuration; it's easy to customize the project's code style to suit your team's needs. See, we can coexist peacefully.
