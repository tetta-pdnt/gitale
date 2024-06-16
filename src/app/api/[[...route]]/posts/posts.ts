import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import {
  PostSchema,
  PostsSchema,
  PostCreateSchema
} from './schema'

let posts = [
  { id: 1, title: 'Post 1', content: 'Content of Post 1' },
  { id: 2, title: 'Post 2', content: 'Content of Post 2' }
]

const getRoute = createRoute({
  method: 'get',
  path: '/',
  description: 'Get all posts',
  request: {},
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: PostsSchema
        }
      }
    }
  },
  tags: ['posts']
})

const postRoute = createRoute({
  method: 'post',
  path: '/',
  description: 'Create a post',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: PostCreateSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: PostSchema
        }
      }
    }
  },
  tags: ['posts']
})

const app = new OpenAPIHono()
  .openapi(getRoute, (c) => {
    return c.json(posts)
  })
  .openapi(postRoute, async (c) => {
    const { title, content } = await c.req.json()
    const newPost = { id: posts.length + 1, title, content }
    posts.push(newPost)
    return c.json(newPost,201)
  })


export default app
