import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import * as schema from './schema'
import { createSelectSchema } from 'drizzle-zod';

const ZUser = createSelectSchema(schema.users)

const app = new Hono<{ Bindings: { DB: D1Database } }>()
  .get('/base', (c) => {
    const data: number[] = [1, 2, 3]
    return c.json(data)
  })
  .get('/d1/array', async (c) => {
    const db = drizzle(c.env.DB)
    const data = await db.select().from(schema.users)
    return c.json(data)
  })
  .get('/d1/object', async (c) => {
    const db = drizzle(c.env.DB)
    const data = await db.select().from(schema.users)
    return c.json({ data })
  })

export default app

const client = testClient(app)

const baseResponse = client.base.$get()

const d1ArrayResponse = client.d1.array.$get()

const d1ObjectResponse = client.d1.object.$get()