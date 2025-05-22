"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./EntryList.css"

const EntryList = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/entries")
        if (!response.ok) {
          throw new Error("Failed to fetch entries")
        }
        const data = await response.json()
        setEntries(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  if (loading) return <div className="loading">Carregando postagens...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (entries.length === 0) return <div className="no-entries">Nenhuma postagem. Crie a sua primeira!</div>

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <div key={entry._id} className="entry-card">
          <div className="entry-date">
            {new Date(entry.dateTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <h2 className="entry-title">{entry.title}</h2>
          <div className="entry-image-container">
            <img src={`http://localhost:5000${entry.photo}`} alt={entry.title} className="entry-image" />
          </div>
          <p className="entry-text">{entry.text.length > 150 ? `${entry.text.substring(0, 150)}...` : entry.text}</p>
          <Link to={`/entry/${entry._id}`} className="read-more">
            Saiba mais...
          </Link>
        </div>
      ))}
    </div>
  )
}

export default EntryList
