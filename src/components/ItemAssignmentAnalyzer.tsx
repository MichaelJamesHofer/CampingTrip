'use client';

import React, { useState } from 'react';
import { useChecklist } from '../lib/ChecklistContext';

const ItemAssignmentAnalyzer: React.FC = () => {
  const { categories } = useChecklist();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Count items by assignment
  const assignmentCounts = {
    group: 0,
    person1: 0,
    person2: 0,
    person3: 0,
    total: 0
  };
  
  categories.forEach(category => {
    category.items.forEach(item => {
      assignmentCounts[item.assignment as keyof typeof assignmentCounts]++;
      assignmentCounts.total++;
    });
  });
  
  // Calculate percentages
  const percentages = {
    group: Math.round((assignmentCounts.group / assignmentCounts.total) * 100) || 0,
    person1: Math.round((assignmentCounts.person1 / assignmentCounts.total) * 100) || 0,
    person2: Math.round((assignmentCounts.person2 / assignmentCounts.total) * 100) || 0,
    person3: Math.round((assignmentCounts.person3 / assignmentCounts.total) * 100) || 0
  };
  
  return (
    <div className="mb-8 bg-slate-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Item Assignment Analysis</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700 rounded p-3 text-center">
          <div className="text-sm text-white/70">Group Items</div>
          <div className="text-2xl font-bold">{assignmentCounts.group}</div>
          <div className="text-sm text-white/70">{percentages.group}%</div>
        </div>
        
        <div className="bg-slate-700 rounded p-3 text-center">
          <div className="text-sm text-white/70">Person 1</div>
          <div className="text-2xl font-bold">{assignmentCounts.person1}</div>
          <div className="text-sm text-white/70">{percentages.person1}%</div>
        </div>
        
        <div className="bg-slate-700 rounded p-3 text-center">
          <div className="text-sm text-white/70">Person 2</div>
          <div className="text-2xl font-bold">{assignmentCounts.person2}</div>
          <div className="text-sm text-white/70">{percentages.person2}%</div>
        </div>
        
        <div className="bg-slate-700 rounded p-3 text-center">
          <div className="text-sm text-white/70">Person 3</div>
          <div className="text-2xl font-bold">{assignmentCounts.person3}</div>
          <div className="text-sm text-white/70">{percentages.person3}%</div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Filter Items</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded ${
              selectedFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            All Items
          </button>
          
          <button
            onClick={() => setSelectedFilter('group')}
            className={`px-3 py-1 rounded ${
              selectedFilter === 'group' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Group Items
          </button>
          
          <button
            onClick={() => setSelectedFilter('person1')}
            className={`px-3 py-1 rounded ${
              selectedFilter === 'person1' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Person 1
          </button>
          
          <button
            onClick={() => setSelectedFilter('person2')}
            className={`px-3 py-1 rounded ${
              selectedFilter === 'person2' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Person 2
          </button>
          
          <button
            onClick={() => setSelectedFilter('person3')}
            className={`px-3 py-1 rounded ${
              selectedFilter === 'person3' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-white/70 hover:bg-slate-600'
            }`}
          >
            Person 3
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">
          {selectedFilter === 'all' ? 'All Items' : 
           selectedFilter === 'group' ? 'Group Items' : 
           `${selectedFilter.replace('person', 'Person ')} Items`}
        </h3>
        
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categories.map(category => (
            <React.Fragment key={category.id}>
              {category.items
                .filter(item => selectedFilter === 'all' || item.assignment === selectedFilter)
                .map(item => (
                  <div key={item.id} className="bg-slate-700 rounded p-2 flex justify-between">
                    <span>{item.text}</span>
                    <span className="text-sm text-white/70">
                      {item.assignment === 'group' ? 'Group' : 
                       item.assignment.replace('person', 'Person ')}
                    </span>
                  </div>
                ))
              }
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemAssignmentAnalyzer;
