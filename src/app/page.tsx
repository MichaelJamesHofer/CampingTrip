'use client';

import React from 'react';
import { ChecklistProvider } from '../lib/ChecklistContext';
import CampingChecklist from '../components/CampingChecklist';
import UserSelector from '../components/UserSelector';

export default function Home() {
  return (
    <ChecklistProvider>
      <main className="min-h-screen bg-slate-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <UserSelector />
          <CampingChecklist />
        </div>
      </main>
    </ChecklistProvider>
  );
}
