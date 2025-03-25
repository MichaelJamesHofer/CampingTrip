'use client';

import React from 'react';
import { useChecklist } from '../lib/ChecklistContext';

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

interface ChecklistCategoryProps {
  category: Category;
  isActive: boolean;
  onToggleItem: (itemId: string) => void;
  onCategoryClick: () => void;
  currentUser: string;
}

export default function ChecklistCategory({
  category,
  isActive,
  onToggleItem,
  onCategoryClick,
  currentUser
}: ChecklistCategoryProps) {
  const { updateItemAssignment } = useChecklist();
  const totalItems = category.items.length;
  const checkedItems = category.items.filter(item => item.checked).length;
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  const handleAssignmentChange = (itemId: string, assignment: string) => {
    updateItemAssignment(itemId, assignment);
  };

  return (
    <div className="category-container">
      <button 
        onClick={onCategoryClick}
        className="w-full flex items-center justify-between py-2"
      >
        <div>
          <h2 className="category-header">{category.name}</h2>
          <div className="text-sm text-white/70">
            {checkedItems} of {totalItems} items complete
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div 
            className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          >
            ▼
          </div>
        </div>
      </button>
      
      {isActive && (
        <div className="pt-4 space-y-1">
          {category.items.map(item => (
            <div 
              key={item.id} 
              className={`checklist-item ${item.checked ? 'checked' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={item.checked}
                    onChange={() => onToggleItem(item.id)}
                    className="rounded"
                  />
                  <label htmlFor={item.id}>{item.text}</label>
                </div>
                
                <select
                  value={item.assignment}
                  onChange={(e) => handleAssignmentChange(item.id, e.target.value)}
                  className="bg-slate-700 text-white border border-slate-600 rounded px-2 py-1 text-sm"
                >
                  <option value="group">Group</option>
                  <option value="person1">Person 1</option>
                  <option value="person2">Person 2</option>
                  <option value="person3">Person 3</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
