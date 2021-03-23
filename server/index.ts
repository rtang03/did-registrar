require('dotenv').config();
import http from 'http';
import util from 'util';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express from 'express';
import jwt from 'express-jwt';
import helmet from 'helmet';
import jwksRsa from 'jwks-rsa';
import morgan from 'morgan';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);
const baseUrl = process.env.AUTH0_BASE_URL;
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;

app
  .prepare()
  .then(() => {
    if (!baseUrl || !issuerBaseUrl)
      throw new Error('Please make sure that the file .env.local is in place and populated');

    // if (!audience)
    //   throw new Error('AUTH0_AUDIENCE not set in .env.local. Shutting down API server.');

    const checkJwt = jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
      }),
      audience: audience,
      issuer: `${issuerBaseUrl}/`,
      algorithms: ['RS256'],
    });

    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(morgan('dev'));
    // todo: trouble this later
    // server.use(helmet());
    server.use(cors({ origin: baseUrl }));
    server.use(errorHandler());

    server.get('/api/shows', checkJwt, (req, res) => {
      res.send({ msg: 'Your access token was successfully validated!' });
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
