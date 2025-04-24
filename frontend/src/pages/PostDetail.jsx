import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function PostDetail() {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(res => setPost(res.data))
  }, [id])

  if (!post) return <div>Carregando...</div>

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">← Voltar</Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{new Date(post.createdAt).toLocaleString()}</p>
      {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} className="mb-4 w-full max-h-96 object-contain" />}
      <p className="whitespace-pre-line">{post.content}</p>
    </div>
  )
}