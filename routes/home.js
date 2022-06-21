var express = require('express');
var router = express.Router();

// Require controller modules.
var comment_controller = require('../controllers/commentController');

/// COMMENT ROUTES ///

// GET comments home page.
router.get('/', comment_controller.index);

// GET request for creating comment. NOTE This must come before route for id (i.e. display comment).
router.get('/comment/create', comment_controller.comment_create_get);

// POST request for creating comment.
router.post('/comment/create', comment_controller.comment_create_post);

// GET request to delete comment.
router.get('/comment/:id/delete', comment_controller.comment_delete_get);

// POST request to delete comment.
router.post('/comment/:id/delete', comment_controller.comment_delete_post);

// GET request to update comment.
router.get('/comment/:id/update', comment_controller.comment_update_get);

// POST request to update comment.
router.post('/comment/:id/update', comment_controller.comment_update_post);

// GET request for one comment.
router.get('/comment/:id', comment_controller.comment_detail);

// GET request for list of all comments.
router.get('/comments', comment_controller.comment_list);

module.exports = router;
