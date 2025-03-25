'use client';

import React from 'react';
import ChecklistCategory from './ChecklistCategory';
import ItemAssignmentAnalyzer from './ItemAssignmentAnalyzer';
import IglooAnimation from './IglooAnimation';
import { useChecklist } from '../lib/ChecklistContext';

export default function CampingChecklist() {
  const { categories, progress, toggleItem, currentUser } = useChecklist();
  const [activeCategory, setActiveCategory] = React.useState('');
  const [filterAssignment, setFilterAssignment] = React.useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? '' : categoryId);
  };

  // Filter categories based on assignment filter
  const filteredCategories = React.useMemo(() => {
    if (filterAssignment === 'all') {
      return categories;
    }
    
    return categories.map(category => ({
      ...category,
      items: category.items.filter(item => item.assignment === filterAssignment)
    })).filter(category => category.items.length > 0);
  }, [categories, filterAssignment]);

  return (
    <div className="relative">
      <div className="mb-8 text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 glow-effect">North Idaho Camping Checklist</h1>
        <p className="text-xl text-white/70">Mid-April Trip Preparation</p>
        
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between mb-2">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <ItemAssignmentAnalyzer />

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Filter By Assignment</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterAssignment('all')}
            className={`px-3 py-1 rounded ${
              filterAssignment === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            All Items
          </button>
          
          <button
            onClick={() => setFilterAssignment('group')}
            className={`px-3 py-1 rounded ${
              filterAssignment === 'group' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Group Items
          </button>
          
          <button
            onClick={() => setFilterAssignment('person1')}
            className={`px-3 py-1 rounded ${
              filterAssignment === 'person1' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Person 1
          </button>
          
          <button
            onClick={() => setFilterAssignment('person2')}
            className={`px-3 py-1 rounded ${
              filterAssignment === 'person2' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Person 2
          </button>
          
          <button
            onClick={() => setFilterAssignment('person3')}
            className={`px-3 py-1 rounded ${
              filterAssignment === 'person3' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Person 3
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {filteredCategories.map((category, index) => (
              <div
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ChecklistCategory 
                  category={category}
                  isActive={activeCategory === category.id}
                  onToggleItem={(itemId) => toggleItem(category.id, itemId)}
                  onCategoryClick={() => handleCategoryClick(category.id)}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="wireframe-grid rounded-lg p-6 border border-white/10 backdrop-blur-sm">
          <div className="sticky top-6">
            <IglooAnimation progress={progress} />
            
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">Trip Details</h3>
              
              <div className="wireframe-element p-4">
                <div className="text-sm text-white/70 mb-1">Location</div>
                <div className="font-medium">North Idaho</div>
              </div>
              
              <div className="wireframe-element p-4">
                <div className="text-sm text-white/70 mb-1">Date</div>
                <div className="font-medium">Mid-April 2025</div>
              </div>
              
              <div className="wireframe-element p-4">
                <div className="text-sm text-white/70 mb-1">Weather</div>
                <div className="font-medium">33-40°F nights, 54-63°F days</div>
                <div className="text-sm text-white/70 mt-1">Possible rain/snow</div>
              </div>
              
              <div className="wireframe-element p-4">
                <div className="text-sm text-white/70 mb-1">Wildlife Concerns</div>
                <div className="font-medium">Bears active in April</div>
                <div className="text-sm text-white/70 mt-1">Bear spray recommended</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
