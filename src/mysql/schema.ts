import { sql } from "drizzle-orm";
import { int, mysqlTable, text, json } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    test: json("test").$type<Record<string, unknown>>(),
    createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
});
