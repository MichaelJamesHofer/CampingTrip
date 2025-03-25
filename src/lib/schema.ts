import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at').notNull().default(Math.floor(Date.now() / 1000))
});

// Categories table
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at').notNull().default(Math.floor(Date.now() / 1000))
});

// Items table
export const items = sqliteTable('items', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  assignment: text('assignment').notNull().default('group'),
  createdAt: integer('created_at').notNull().default(Math.floor(Date.now() / 1000))
});

// User Items table for tracking checked status per user
export const userItems = sqliteTable('user_items', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  itemId: text('item_id').notNull().references(() => items.id, { onDelete: 'cascade' }),
  checked: integer('checked', { mode: 'boolean' }).notNull().default(false),
  updatedAt: integer('updated_at').notNull().default(Math.floor(Date.now() / 1000)),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.itemId] })
  };
});
