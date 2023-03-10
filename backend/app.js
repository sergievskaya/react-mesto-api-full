require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1/mestodb',
} = process.env;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  standardHeaders: true, // Возвращает информ. об ограничении скорости в заголовках `RateLimit- *`
  legacyHeaders: false, // Отключите заголовки `X-RateLimit-*`
});

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

mongoose.connect(MONGO_URL);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routerUsers);
app.use(routerCards);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listen port ${PORT}`);
});
