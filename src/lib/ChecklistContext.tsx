'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  assignment: string;
}

interface Category {
  id: string;
  name: string;
  items: ChecklistItem[];
}

interface ChecklistContextType {
  categories: Category[];
  users: User[];
  currentUser: string;
  progress: number;
  setCurrentUser: (userId: string) => void;
  toggleItem: (categoryId: string, itemId: string) => void;
  updateItemAssignment: (itemId: string, assignment: string) => void;
}

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

// Mock data for users
const mockUsers = [
  { id: 'person1', name: 'Person 1' },
  { id: 'person2', name: 'Person 2' },
  { id: 'person3', name: 'Person 3' }
];

// Mock data for categories and items
const mockCategories = [
  {
    id: 'campsite',
    name: 'Campsite Equipment',
    items: [
      { id: 'tent', text: 'Tent', checked: false, assignment: 'group' },
      { id: 'sleepingbag', text: 'Sleeping Bag', checked: false, assignment: 'person1' },
      { id: 'sleepingpad', text: 'Sleeping Pad', checked: false, assignment: 'person1' },
      { id: 'pillow', text: 'Pillow', checked: false, assignment: 'person1' },
      { id: 'tarp', text: 'Tarp', checked: false, assignment: 'group' },
      { id: 'hammer', text: 'Hammer/Mallet', checked: false, assignment: 'group' },
      { id: 'stakes', text: 'Extra Stakes', checked: false, assignment: 'group' },
      { id: 'lantern', text: 'Lantern', checked: false, assignment: 'group' },
      { id: 'headlamp', text: 'Headlamp', checked: false, assignment: 'person1' },
      { id: 'batteries', text: 'Extra Batteries', checked: false, assignment: 'group' }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    items: [
      { id: 'baseLayer', text: 'Base Layer (Thermal)', checked: false, assignment: 'person1' },
      { id: 'midLayer', text: 'Mid Layer (Fleece)', checked: false, assignment: 'person1' },
      { id: 'outerLayer', text: 'Outer Layer (Waterproof)', checked: false, assignment: 'person1' },
      { id: 'hikingBoots', text: 'Hiking Boots', checked: false, assignment: 'person1' },
      { id: 'campShoes', text: 'Camp Shoes', checked: false, assignment: 'person1' },
      { id: 'socks', text: 'Wool Socks (3 pairs)', checked: false, assignment: 'person1' },
      { id: 'hat', text: 'Warm Hat', checked: false, assignment: 'person1' },
      { id: 'gloves', text: 'Gloves', checked: false, assignment: 'person1' },
      { id: 'sunglasses', text: 'Sunglasses', checked: false, assignment: 'person1' }
    ]
  },
  {
    id: 'food',
    name: 'Food and Water',
    items: [
      { id: 'water', text: 'Water (2L per person per day)', checked: false, assignment: 'person1' },
      { id: 'waterFilter', text: 'Water Filter/Purifier', checked: false, assignment: 'group' },
      { id: 'cookingPot', text: 'Cooking Pot', checked: false, assignment: 'group' },
      { id: 'stove', text: 'Camp Stove', checked: false, assignment: 'group' },
      { id: 'fuel', text: 'Fuel', checked: false, assignment: 'group' },
      { id: 'matches', text: 'Waterproof Matches/Lighter', checked: false, assignment: 'group' },
      { id: 'foodBag', text: 'Food Storage Bag (Bear-proof)', checked: false, assignment: 'group' },
      { id: 'meals', text: 'Meals (Freeze-dried/Easy to prepare)', checked: false, assignment: 'person1' },
      { id: 'snacks', text: 'Snacks', checked: false, assignment: 'person1' },
      { id: 'coffee', text: 'Coffee/Tea', checked: false, assignment: 'group' }
    ]
  },
  {
    id: 'safety',
    name: 'Safety and Emergency',
    items: [
      { id: 'firstAid', text: 'First Aid Kit', checked: false, assignment: 'group' },
      { id: 'bearSpray', text: 'Bear Spray', checked: false, assignment: 'group' },
      { id: 'whistle', text: 'Whistle', checked: false, assignment: 'person1' },
      { id: 'fireStarter', text: 'Fire Starter', checked: false, assignment: 'group' },
      { id: 'emergencyBlanket', text: 'Emergency Blanket', checked: false, assignment: 'person1' },
      { id: 'multitool', text: 'Multi-tool', checked: false, assignment: 'group' }
    ]
  },
  {
    id: 'idaho',
    name: 'North Idaho Specific (Mid-April)',
    items: [
      { id: 'rainGear', text: 'Rain Gear (April showers)', checked: false, assignment: 'person1' },
      { id: 'insectRepellent', text: 'Insect Repellent', checked: false, assignment: 'group' },
      { id: 'sunscreen', text: 'Sunscreen', checked: false, assignment: 'group' },
      { id: 'extraWarmth', text: 'Extra Warmth Layer (for 30-40°F nights)', checked: false, assignment: 'person1' },
      { id: 'hikingPoles', text: 'Hiking Poles (for muddy trails)', checked: false, assignment: 'person1' },
      { id: 'waterproofBag', text: 'Waterproof Bag for Electronics', checked: false, assignment: 'person1' }
    ]
  }
];

// Mock user item checked status
const mockUserItems: Record<string, Record<string, boolean>> = {
  'person1': {},
  'person2': {},
  'person3': {}
};

// Initialize with some checked items for demonstration
mockCategories.forEach(category => {
  category.items.forEach(item => {
    mockUserItems['person1'][item.id] = Math.random() > 0.7;
    mockUserItems['person2'][item.id] = Math.random() > 0.7;
    mockUserItems['person3'][item.id] = Math.random() > 0.7;
  });
});

export const ChecklistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [users] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<string>('person1');
  const [progress, setProgress] = useState<number>(0);
  const [userItems, setUserItems] = useState<Record<string, Record<string, boolean>>>(mockUserItems);

  // Update categories with checked status for current user
  useEffect(() => {
    const updatedCategories = categories.map(category => ({
      ...category,
      items: category.items.map(item => ({
        ...item,
        checked: userItems[currentUser]?.[item.id] || false
      }))
    }));
    
    setCategories(updatedCategories);
  }, [currentUser, userItems]);

  // Calculate progress
  useEffect(() => {
    const totalItems = categories.reduce((acc, category) => acc + category.items.length, 0);
    const checkedItems = categories.reduce((acc, category) => 
      acc + category.items.filter(item => item.checked).length, 0);
    
    setProgress(totalItems > 0 ? (checkedItems / totalItems) * 100 : 0);
  }, [categories]);

  // Toggle item checked status
  const toggleItem = (categoryId: string, itemId: string) => {
    // Update local state
    const newUserItems = { ...userItems };
    newUserItems[currentUser] = { ...newUserItems[currentUser] };
    newUserItems[currentUser][itemId] = !newUserItems[currentUser][itemId];
    setUserItems(newUserItems);
    
    // In a real app, this would send an update to the server
    console.log(`Toggled item ${itemId} for user ${currentUser}`);
  };

  // Update item assignment
  const updateItemAssignment = (itemId: string, assignment: string) => {
    // Update local state
    setCategories(prevCategories => 
      prevCategories.map(category => {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, assignment } : item
          )
        };
      })
    );
    
    // In a real app, this would send an update to the server
    console.log(`Updated assignment for item ${itemId} to ${assignment}`);
  };

  return (
    <ChecklistContext.Provider
      value={{
        categories,
        users,
        currentUser,
        progress,
        setCurrentUser,
        toggleItem,
        updateItemAssignment,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (context === undefined) {
    throw new Error('useChecklist must be used within a ChecklistProvider');
  }
  return context;
};
