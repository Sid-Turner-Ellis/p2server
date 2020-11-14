const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 4000;
const baseURL = '/api/'
const mainRouter = require('./routes/mainRoute')

// mongo setup
const mongoose = require('mongoose');
const mongoDB =
  'mongodb+srv://test:test@test.g3tzi.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('your connected to the database'); }
);
mongoose.connection.on('error', (err) => {
  throw new Error('Connection to the database failed', err);
});

//middlewares
app.use(cors());
app.use(express.json());
morgan.token('test', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status -- :test -- :res[content-length] - :response-time ms '
  )
);
app.use(baseURL,mainRouter)

// error handling
app.use('/', (req, res, next) => {
  const err = new Error('page does not exist');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`server is running - ${PORT}`);
});


