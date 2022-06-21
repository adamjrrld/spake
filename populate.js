#! /usr/bin/env node

console.log(
  'This script populates some comments. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Comment = require('./models/comment');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var comments = [];

function commentCreate(name, rating, comment, howManyBeers, cb) {
  commentdetail = {
    name: name,
    rating: rating,
    comment: comment,
    howManyBeers: howManyBeers,
  };
  if (name != false) commentdetail.name = name;

  var comment = new Comment(commentdetail);
  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Comment: ' + comment);
    comments.push(comment);
    cb(null, comment);
  });
}

function createComments(cb) {
  async.parallel(
    [
      function (callback) {
        commentCreate(
          'Adam',
          3,
          'This is the ugliest man I have ever set eyes on. Please for the love of God do not let him near my children',
          13,
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Hamish',
          9,
          'Extremely gorgeous. I would love to shag him',
          0,
          callback
        );
      },
      function (callback) {
        commentCreate(
          'Ander',
          10,
          'What man? I can only see a horse with 6 legs',
          65,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createComments],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Comments: ' + comments);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
