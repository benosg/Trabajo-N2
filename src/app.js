const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const helmet = require('helmet');
const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
  
});