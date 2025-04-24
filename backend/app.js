const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Config Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Rotas
const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes(upload));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));