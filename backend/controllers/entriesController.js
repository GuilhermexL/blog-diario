import Entry from "../models/Entry.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Business logic CRUD operations

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get all entries
export const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find().sort({ dateTime: -1 })
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single entry by ID
export const getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id)
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" })
    }
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new entry
export const createEntry = async (req, res) => {
  try {
    const { title, text } = req.body

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" })
    }

    const photoUrl = `/uploads/${req.file.filename}`

    const newEntry = new Entry({
      title,
      text,
      photo: photoUrl,
    })

    const savedEntry = await newEntry.save()
    res.status(201).json(savedEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete an entry (optional functionality)
export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id)

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" })
    }

    // Delete the associated image file
    if (entry.photo) {
      const photoPath = path.join(__dirname, "..", entry.photo)
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath)
      }
    }

    await Entry.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Entry deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
