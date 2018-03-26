const express = require('express');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const apiRouter = require('./common/apiRouter.js');

const server = express();

const port = process.env.PORT || 5003;

server.use(cors());
server.use(bodyParser.json());

server.use('', apiRouter);

// const wss = new SocketServer({ server });
// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('close', () => console.log('Client disconnected'));
// });
const MongoClient = require('mongodb').MongoClient;
const AtlasMongoIUrl =
  'mongodb://LambdaDataManager:XPoCMUH4qMHINDKc@mongoi-shard-00-00-2ydlw.mongodb.net:27017,mongoi-shard-00-01-2ydlw.mongodb.net:27017,mongoi-shard-00-02-2ydlw.mongodb.net:27017/mongoi?ssl=true&replicaSet=mongoi-shard-0&authSource=admin';
//          'mongodb://BBData:1715m6kPqfppaHy4@bb-lambda0-shard-00-00-gdvzr.mongodb.net:27017,bb-lambda0-shard-00-01-gdvzr.mongodb.net:27017,bb-lambda0-shard-00-02-gdvzr.mongodb.net:27017/BBTest?ssl=true&replicaSet=BB-Lambda0-shard-0&authSource=admin';
//const accountCollection = 'BBCollection'
const accountCollection = 'accounts'
/*
MongoClient.connect(AtlasMongoIUrl, (err,db) => {
  if (err) {
    console.log('connect err:', err)
    throw err
  }
  */
//const collection = db.collection()
mongoose.Promise = global.Promise;
mongoose
  .connect(AtlasMongoIUrl + `&collection=${accountCollection}`, { useMongoClient: true })
  .then((db) => {
    // Priority serve any static files.
    server.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    console.log('All your databases are belong to us!');

    server.listen(port, function () {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(function (err) {
    console.log('Database connection failed', err.message);
  });