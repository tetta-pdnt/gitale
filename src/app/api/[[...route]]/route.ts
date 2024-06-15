import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

let posts = [
  { id: 1, title: 'Post 1', content: 'Content of Post 1' },
  { id: 2, title: 'Post 2', content: 'Content of Post 2' }
]

app.get('/post', (c) => {
  return c.json(posts)
})

app.post('/post', async (c) => {
  const { title, content } = await c.req.json()
  const newPost = { id: posts.length + 1, title, content }
  posts.push(newPost)
  return c.json(newPost,201)
})



export const GET = handle(app)
export const POST = handle(app)
