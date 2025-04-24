const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');

module.exports = (upload) => {
  router.get('/', postController.getAllPosts);
  router.get('/:id', postController.getPostById);
  router.post('/', upload.single('image'), postController.createPost);
  return router;
};