import { Hono } from 'hono'

let posts = [
  { id: 1, title: 'Post 1', content: 'Content of Post 1' },
  { id: 2, title: 'Post 2', content: 'Content of Post 2' }
]

const app = new Hono()
  .get('/', (c) => {
    return c.json(posts)
  })
  .post('/', async (c) => {
    const { title, content } = await c.req.json()
    const newPost = { id: posts.length + 1, title, content }
    posts.push(newPost)
    return c.json(newPost,201)
  })


export default app
