import { drizzle } from 'drizzle-orm/node-postgres';
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import * as schema from './schema'
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod'

const ZUser = createSelectSchema(schema.users)

const app = new Hono()
  .get('/base', (c) => {
    const data: number[] = [1, 2, 3]
    return c.json(data)
  })
  .get('/postgres/array', async (c) => {
    const db = drizzle('')
    const data = await db.select().from(schema.users)
    const parsed = ZUser.array().parse(data)
    return c.json(data)
  })
  .get('/postgres/object', async (c) => {
    const db = drizzle('')
    const data = await db.select().from(schema.users)
    return c.json({ data })
  })

export default app

const client = testClient(app)

const baseResponse = client.base.$get()

const postgresArrayResponse = client.postgres.array.$get()

const postgresObjectResponse = client.postgres.object.$get()