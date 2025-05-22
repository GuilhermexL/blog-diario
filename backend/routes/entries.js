import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { getEntries, getEntryById, createEntry, deleteEntry } from "../controllers/entriesController.js"

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, uniqueSuffix + ext)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpg", ".jpeg", ".png"]
  const ext = path.extname(file.originalname).toLowerCase()

  if (allowedTypes.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error("Only .jpg, .jpeg and .png files are allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})

// Routes
router.get("/", getEntries)
router.get("/:id", getEntryById)
router.post("/", upload.single("photo"), createEntry)
router.delete("/:id", deleteEntry)

export default router
