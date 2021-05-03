import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import router from './routes';

const server = express();

// middlewares
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use('/', router)

export default server;