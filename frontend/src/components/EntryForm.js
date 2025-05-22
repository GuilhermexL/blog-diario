"use client"

import { useState } from "react"
import "./EntryForm.css"

const EntryForm = ({ onEntryAdded }) => {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !text || !photo) {
      setError("All fields are required")
      return
    }

    if (title.length > 100) {
      setError("Title must be less than 100 characters")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("text", text)
      formData.append("photo", photo)

      const response = await fetch("http://localhost:5000/api/entries", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create entry")
      }

      const data = await response.json()

      // Reset form
      setTitle("")
      setText("")
      setPhoto(null)
      setPhotoPreview(null)
      setSuccess(true)

      // Notify parent component
      if (onEntryAdded) {
        onEntryAdded(data)
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="entry-form-container">
      <h2>Criar Postagem</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Criado com sucesso!</div>}

      <form onSubmit={handleSubmit} className="entry-form">
        <div className="form-group">
          <label htmlFor="title">Título (max 100 characters)</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />
          <div className="char-count">{title.length}/100</div>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Imagem (JPG/PNG apenas)</label>
          <input type="file" id="photo" accept=".jpg,.jpeg,.png" onChange={handlePhotoChange} required />
          {photoPreview && (
            <div className="photo-preview">
              <img src={photoPreview || "/placeholder.svg"} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="text">Descrição</label>
          <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} rows={6} required />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Postando..." : "Criar postagem"}
        </button>
      </form>
    </div>
  )
}

export default EntryForm
