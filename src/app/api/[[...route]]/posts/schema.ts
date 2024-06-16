import { z } from '@hono/zod-openapi'

export const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
})

export const PostCreateSchema = PostSchema.omit({ id: true })

export const PostsSchema = z.array(PostSchema)
