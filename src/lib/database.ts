import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import { 
  users, 
  categories, 
  items, 
  userItems 
} from './schema';

export class Database {
  private db;

  constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }

  // User methods
  async getUsers() {
    return this.db.select().from(users);
  }

  async getUserById(id: string) {
    return this.db.select().from(users).where(eq(users.id, id));
  }

  // Category methods
  async getCategories() {
    return this.db.select().from(categories);
  }

  // Item methods
  async getItems() {
    return this.db.select().from(items);
  }

  async getItemsByCategory(categoryId: string) {
    return this.db.select().from(items).where(eq(items.categoryId, categoryId));
  }

  async updateItemAssignment(itemId: string, assignment: string) {
    return this.db.update(items)
      .set({ assignment })
      .where(eq(items.id, itemId));
  }

  // User Item methods
  async getUserItems(userId: string) {
    return this.db.select().from(userItems).where(eq(userItems.userId, userId));
  }

  async toggleItemChecked(userId: string, itemId: string) {
    // First check if the record exists
    const existingRecord = await this.db.select()
      .from(userItems)
      .where(and(
        eq(userItems.userId, userId),
        eq(userItems.itemId, itemId)
      ));

    if (existingRecord.length > 0) {
      // Toggle the checked status
      return this.db.update(userItems)
        .set({ 
          checked: !existingRecord[0].checked,
          updatedAt: Math.floor(Date.now() / 1000)
        })
        .where(and(
          eq(userItems.userId, userId),
          eq(userItems.itemId, itemId)
        ));
    } else {
      // Create a new record with checked=true
      return this.db.insert(userItems)
        .values({
          userId,
          itemId,
          checked: true,
          updatedAt: Math.floor(Date.now() / 1000)
        });
    }
  }

  // Get full checklist with checked status for a user
  async getFullChecklist(userId: string) {
    // This is a more complex query that would join categories, items, and user_items
    // For simplicity, we'll implement this in the API route by combining multiple queries
    const allCategories = await this.getCategories();
    const allItems = await this.getItems();
    const userCheckedItems = await this.getUserItems(userId);
    
    // Create a map of item ID to checked status
    const checkedMap = new Map();
    userCheckedItems.forEach(item => {
      checkedMap.set(item.itemId, item.checked);
    });
    
    // Group items by category
    const itemsByCategory = allItems.reduce((acc, item) => {
      if (!acc[item.categoryId]) {
        acc[item.categoryId] = [];
      }
      
      acc[item.categoryId].push({
        ...item,
        checked: checkedMap.get(item.id) || false
      });
      
      return acc;
    }, {});
    
    // Build the final checklist structure
    return allCategories.map(category => ({
      ...category,
      items: itemsByCategory[category.id] || []
    }));
  }
}
