import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';
import { config } from './config';
/**
 * Route Controllers
 */
import apiRoutes from './api/routes';
/**
 * Serve Favicon
 */
const favicon = require('serve-favicon');
/**
 * Express setup
 */
export const app = express();
export const server = new http.Server(app);
/*
	Middleware
*/
const port = normalizePort(config.PORT || 3000);
app.set('port', port);
if (config.NODE_ENV !== 'production') {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * Serve production assets
 */
if (config.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../../client/dist/')));
}
/**
 * Routing
 */
app.use('/api', apiRoutes)

if (config.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}
/**
 * 404 routing
 */
app.use(function (req, res, next) {
  const err = new Error('404');
  next(err);
});
/**
 * Server
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError (error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  const addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

// export default server;
