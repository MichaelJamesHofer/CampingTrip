'use client';

import React from 'react';
import { useChecklist } from '../lib/ChecklistContext';

const UserSelector: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useChecklist();

  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg p-4 inline-flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Select Camper</h2>
        <div className="flex gap-2">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => setCurrentUser(user.id)}
              className={`px-4 py-2 rounded-md transition-all ${
                currentUser === user.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-white/70 hover:bg-slate-600'
              }`}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSelector;
