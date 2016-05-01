# Testing

dcomponent uses [Intern] as its testing setup. To run the tests, you need to install a 
local selenium server. You can also use Sauce Labs or something similar, but therefore you
need to modify the tests/intern.js configuration. How to do this can be obtained from the 
[Intern wiki].

## Getting started

Install dependencies for testing.

```
npm install 
```

Install and start a selenium standalone server.

```
npm install selenium-standalone@latest -g
selenium-standalone install
selenium-standalone start
```

Run the tests.

```
npm test
```

[Intern]: <https://theintern.github.io>
[Intern wiki]: <https://theintern.github.io/intern/#what-is-intern>
[selenium standalone server]: <https://www.npmjs.com/package/selenium-standalone>