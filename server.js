// Filename: server.js

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/form', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the "form" database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
  resp.send('App is Working');
});

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const User = mongoose.model('User', UserSchema);
//   const User = mongoose.model('CustomCollectionName', UserSchema, 'customcollection');
// const User = mongoose.model('User', UserSchema, 'login');
const User = mongoose.model('User', UserSchema, 'login');


app.post('/register', async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(result);
      console.log(result);
    } else {
      console.log('User already registered');
    }
  } catch (e) {
    resp.send('Something Went Wrong');
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
