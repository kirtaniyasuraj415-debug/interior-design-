import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const subscribers = sqliteTable("subscribers", {
  email: text("email").primaryKey(),
  createdAt: integer("created_at").notNull(),
});
export const enquiries = sqliteTable("enquiries", {
  id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull(),
  message: text("message").notNull(), createdAt: integer("created_at").notNull(),
}, table => [index("idx_enquiries_email_time").on(table.email, table.createdAt)]);
