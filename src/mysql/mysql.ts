import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { Hono } from 'hono'
import { testClient } from 'hono/testing'
import * as schema from './schema'
import { BaseMime } from "hono/utils/mime";
import { ResponseHeader } from "hono/utils/headers";

const app = new Hono()
  .get('/base', (c) => {
    const data: number[] = [1, 2, 3]
    return c.json(data)
  })
  .get('/mysql/array', async (c) => {
    const client = await mysql.createConnection({})
    const db = drizzle({ client })
    const data = await db.select().from(schema.users)
    return c.json(data)
  })
  .get('/mysql/object', async (c) => {
    const client = await mysql.createConnection({})
    const db = drizzle({ client })
    const data = await db.select().from(schema.users)
    return c.json({ data })
  })

export default app

const client = testClient(app)

const baseResponse = client.base.$get()

const mysqlArrayResponse = client.mysql.array.$get()

const mysqlObjectResponse = client.mysql.object.$get()