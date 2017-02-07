const express = require('express');
const path = require('path');
const webpack = require('webpack');
const consolidate = require('consolidate');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.config.js');
const compiler = webpack(webpackDevConfig);
const port = 3000;

const app = express();

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './server/views'));

app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
}));

app.use(webpackHotMiddleware(compiler));

require('./server/routes')(app);
require('./server/api')(app);

const reload = require('reload');
const http = require('http');

const server = http.createServer(app);
reload(server, app);

server.listen(port, function() {
  console.log(`App is now running on port ${port} !`);
});
