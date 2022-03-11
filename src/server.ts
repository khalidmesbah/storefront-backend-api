import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/error.middleware';
// import our environment variables
import ENV from './middlewares/config';
// create an instance of the server
const app: Application = express();
// import the port from our environment variables
const PORT = ENV.PORT || 3000;

// middleware to parse incoming requests
app.use(express.json());

// i don't know exactly what is this ?
app.use(bodyParser.json());

// http request logger middleware
app.use(morgan('common'));

// http security middleware
app.use(helmet());

// a middleware for limiting the number of requests
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'too many requests from this ip,try again after a year',
  })
);

// routing for /  path
// if you will not use a parameter write it like that _req
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'hello universe',
  });
});

app.get('/err', () => {
  throw new Error('opsy error from the error middleware');
});

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'hello universe from post',
    data: req.body,
  });
});

// to handle errors inside the valid pathes
app.use(errorMiddleware);

// for handling the errors due to wrong pathes
// but it at the end of your file
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'wrong path',
  });
});

app.listen(PORT, () => {
  console.log(`starting app on: ${PORT}`);
});

export default app;
