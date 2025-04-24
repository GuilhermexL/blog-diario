const db = require('../models/posts');

module.exports = {
  getAllPosts: (req, res) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },
  
  getPostById: (req, res) => {
    db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  },
  
  createPost: (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;
    const createdAt = new Date().toISOString();
    
    db.run(
      "INSERT INTO posts (title, content, image, createdAt) VALUES (?, ?, ?, ?)",
      [title, content, image, createdAt],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  }
};