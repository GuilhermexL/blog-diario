"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./EntryDetail.css"

const EntryDetail = () => {
  const { id } = useParams()
  const [entry, setEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/entries/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch entry")
        }
        const data = await response.json()
        setEntry(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchEntry()
  }, [id])

  if (loading) return <div className="loading">Carregando postagem...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!entry) return <div className="not-found">Postagem não encontrada</div>

  return (
    <div className="entry-detail">
      <Link to="/" className="back-link">
        ← Voltar para o início
      </Link>

      <div className="entry-header">
        <h1 className="entry-title">{entry.title}</h1>
        <div className="entry-date">
          {new Date(entry.dateTime).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="entry-image-container">
        <img src={`http://localhost:5000${entry.photo}`} alt={entry.title} className="entry-image-full" />
      </div>

      <div className="entry-content">
        <p>{entry.text}</p>
      </div>
    </div>
  )
}

export default EntryDetail
