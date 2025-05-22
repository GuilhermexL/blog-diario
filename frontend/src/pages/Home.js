"use client"

import { useState } from "react"
import EntryList from "../components/EntryList"
import EntryForm from "../components/EntryForm"
import "./Home.css"

const Home = () => {
  const [refreshList, setRefreshList] = useState(false)

  const handleEntryAdded = () => {
    // Trigger a refresh of the entry list
    setRefreshList((prev) => !prev)
  }

  return (
    <div className="home-container">
      <div className="entries-section">
        <h2>Postagens</h2>
        <EntryList key={refreshList ? "refresh" : "initial"} />
      </div>

      <div className="form-section">
        <EntryForm onEntryAdded={handleEntryAdded} />
      </div>
    </div>
  )
}

export default Home
