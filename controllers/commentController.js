const { body, validationResult } = require('express-validator');
var Comment = require('../models/comment');

var async = require('async');

exports.index = function (req, res) {
  async.parallel(
    {
      comment_count: function (callback) {
        Comment.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
    },
    function (err, results) {
      res.render('index', {
        title: 'Jakes Glasto Page',
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all comments
exports.comment_list = function (req, res, next) {
  Comment.find({}, 'name rating comment howManyBeers').exec(function (
    err,
    list_comments
  ) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render('comment_list', {
      title: 'Comment List',
      comment_list: list_comments,
    });
  });
};

// Display detail page for a specific comment
// @todo maybe remove
exports.comment_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Comment detail ' + req.params.id);
};

// Display comment create form on GET.
exports.comment_create_get = function (req, res, next) {
  res.render('comment_form', { title: 'Rate my mate!' });
};

// Handle comment create on POST.
exports.comment_create_post = [
  // Validate and sanitize the name field.
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.'),
  body('rating').optional({ checkFalsy: true }),
  body('comment')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.'),
  body('howManyBeers').optional({ checkFalsy: true }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a comment object with escaped and trimmed data.
    var comment = new Comment({
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment,
      howManyBeers: req.body.howManyBeers,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('comment_form', {
        title: 'Rate my mate!',
        comment: comment,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      comment.save(function (err) {
        if (err) {
          return next(err);
        }
        // comment saved. Redirect to comment detail page.
        res.redirect('/home/comments');
      });
    }
  },
];

// Display comment delete form on GET.
exports.comment_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: comment delete GET');
};

// Handle comment delete on POST.
exports.comment_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: comment delete POST');
};

// Display comment update form on GET.
exports.comment_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: comment update GET');
};

// Handle comment update on POST.
exports.comment_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: comment update POST');
};
