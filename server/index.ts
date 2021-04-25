require('dotenv').config();
import http from 'http';
import util from 'util';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import next from 'next';
import { default as NextAuth } from 'next-auth';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import yaml from 'yamljs';
import { TypeOrmUserSchema, User, TypoOrmAccountSchema, Account } from '../models';
import { createDidRepository } from '../utils';
import {
  createApplicationRoute,
  createDidRoute,
  createTenantRoute,
  nextauthOptions,
} from './apiRoutes';
import { createUserRoute } from './apiRoutes/createUserRoute';

const authUrl = '/api/auth/';
const swaggerDocument = yaml.load('./swagger.yaml');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);

app
  .prepare()
  .then(async () => {
    const connectionOptions = {
      name: 'default',
      type: 'postgres' as any,
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      logging: process.env.TYPEORM_LOGGING === 'true',
      synchronize: false,
      dropSchema: false,
      entities: [TypeOrmUserSchema, TypoOrmAccountSchema],
      connectTimeoutMS: 10000,
    };
    const connection = await createConnection(connectionOptions);
    const userRepository = connection.getRepository<User>('User');
    const accountRepository = connection.getRepository<Account>('Account');

    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(morgan('dev'));
    // todo: trouble this later
    // server.use(helmet());
    // server.use(cors({ origin: baseUrl }));
    server.use(errorHandler());

    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    server.use('/api/protected', createUserRoute(userRepository, accountRepository));

    const didRepo = createDidRepository({});

    server.use('/api/dids', createDidRoute(didRepo));

    server.use('/api/apps', createApplicationRoute());

    server.use('/api/tenants', createTenantRoute());

    // NOTE: using next-auth in custom Express server
    // @see https://github.com/nextauthjs/next-auth/issues/531
    server.use((req, res, next) => {
      if (!req.url.startsWith(authUrl)) return next();

      req.query.nextauth = req.url // start with request url
        .slice(authUrl.length) // make relative to baseUrl
        .replace(/\?.*/, '') // remove query part, use only path part
        .split('/'); // as array of strings
      NextAuth(req as any, res as any, nextauthOptions);
    });

    server.get('*', (req, res) => handle(req, res));

    http.createServer(server).listen(port, () => {
      console.log(`server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(util.format('❌  fail to start nextjs server, %j', error));
    process.exit(1);
  });
