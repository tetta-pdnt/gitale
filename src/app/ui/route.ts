import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { swaggerUI } from '@hono/swagger-ui'

export const runtime = 'edge'
const app = new Hono()

// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/doc' }))

export const GET = handle(app)
