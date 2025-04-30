import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import * as schema from './schema'

const app = new Hono()
  .get('/base', (c) => {
    const data: number[] = [1, 2, 3]
    return c.json(data)
  })
  .get('/neon/array', async (c) => {
    const client = neon('')
    const db = drizzle({ client })
    const data = await db.select().from(schema.users)
    return c.json(data)
  })
  .get('/neon/object', async (c) => {
    const client = neon('')
    const db = drizzle({ client })
    const data = await db.select().from(schema.users)
    return c.json({ data })
  })

export default app

const client = testClient(app)

const baseResponse = client.base.$get()

const neonArrayResponse = client.neon.array.$get()

const neonObjectResponse = client.neon.object.$get()