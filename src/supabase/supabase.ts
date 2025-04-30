import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import * as schema from './schema'
import { createSelectSchema } from 'drizzle-zod'

const ZUser = createSelectSchema(schema.users)

const app = new Hono()
  .get('/base', (c) => {
    const data: number[] = [1, 2, 3]
    return c.json(data)
  })
  .get('/supabase/array', async (c) => {
    const client = postgres('')
    const db = drizzle({ client });
    const data: Omit<typeof schema.users.$inferSelect, 'settings'>[] = await db.select().from(schema.users)
    const parsed = ZUser.array().parse(data)
    return c.json(data)
  })
  .get('/supabase/object', async (c) => {
    const client = postgres('')
    const db = drizzle({ client });
    const data = await db.select().from(schema.users)
    return c.json({ data })
  })

export default app

const client = testClient(app)

const baseResponse = client.base.$get()

const supabaseArrayResponse = client.supabase.array.$get()

const supabaseObjectResponse = client.supabase.object.$get()