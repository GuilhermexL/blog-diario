import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import EntryPage from "./pages/EntryPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Blog Diário</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/entry/:id" element={<EntryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
