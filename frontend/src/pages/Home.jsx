import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (image) formData.append('image', image)

    console.log('--- FormData Contents ---');
    for (let [key, value] of formData.entries()) {
        if (key === 'image') {
        console.log(`${key}:`, value.name, `(Type: ${value.type}, Size: ${value.size} bytes)`);
        } else {
        console.log(`${key}:`, value);
        }
    }

    const res = await axios.post('http://localhost:5000/posts', formData)
    setPosts([...posts, res.data])
    setTitle('')
    setContent('')
    setImage(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Diário</h1>
      
      <div className="grid gap-4 mb-8">
        {posts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id} className="p-4 border rounded-lg hover:shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
            {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} className="mt-2 h-32 object-cover" />}
            <p className="mt-2 text-gray-700">{post.content.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 p-4 border-t">
        <h2 className="text-xl font-semibold mb-4">Nova Entrada</h2>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full p-2 border mb-2" required />
        <textarea placeholder="Conteúdo" value={content} onChange={(e) => setContent(e.target.value)} className="block w-full p-2 border mb-2" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="block mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Publicar</button>
      </form>
    </div>
  )
}