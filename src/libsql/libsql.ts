import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import * as schema from './schema'

const app = new Hono()
  .get('/base', (c) => {
    const data: number[] = [1, 2, 3]
    return c.json(data)
  })
  .get('/libsql/array', async (c) => {
    const client = createClient({ url: '' })
    const db = drizzle({ client })
    const data = await db.select().from(schema.users)
    return c.json(data)
  })
  .get('/libsql/object', async (c) => {
    const client = createClient({ url: '' })
    const db = drizzle({ client })
    const data = await db.select().from(schema.users)
    return c.json({ data })
  })

export default app

const client = testClient(app)

const baseResponse = client.base.$get()

const libsqlArrayResponse = client.libsql.array.$get()

const libsqlObjectResponse = client.libsql.object.$get()