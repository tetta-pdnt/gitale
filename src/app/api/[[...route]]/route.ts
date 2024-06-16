import { handle } from 'hono/vercel'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'

import posts from './posts/posts'

export const runtime = 'edge'

const app = new OpenAPIHono().basePath('/api')
const route = app
  .route('/posts', posts)
  .route('/swagger-ui', new OpenAPIHono().get('/', swaggerUI({ url: '/api/doc' })))
  .doc31('/doc',{
    openapi: '3.1.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    servers: [
      { url: '/api' }
    ]
  })

export type AppType = typeof route

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
