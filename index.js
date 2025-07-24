
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const speakOutRouter = require('./routes/speakOut');

app.use('/api/speakout', speakOutRouter);

const path = require('path');

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
