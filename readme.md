# AppError

## Install

`npm i -S @bonjourjohn/app-error`

## Usage

With [koa](http://koajs.com/):

```javascript
const koa = require('koa');
const AppError = require('@bonjourjohn/app-error');

const app = new koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    //if caught error is not AppError, convert it
    if (!(err instanceOf AppError)) {
      err = AppError.fromError(err);
    }

    // will only respond with JSON
    ctx.status = err.errno;
    ctx.body = {
      errno: err.errno,
      error: err.error
    };
  }
});

[...] //rest of your code
```

## Testing

Run `npm test` after `npm install`.
