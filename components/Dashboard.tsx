import React, { useState } from 'react';
import { Category, Difficulty } from '../types';
import type { PracticeMode } from '../types';
import {
  CATEGORIES,
  DIFFICULTY_LEVELS,
  PRACTICE_MODES,
} from '../constants';
import { ChevronRightIcon, EyeIcon } from './icons';
import NeumorphicCard from './ui/NeumorphicCard';

interface DashboardProps {
  onStartSession: (
    mode: PracticeMode,
    difficulty: Difficulty,
    category: Category,
  ) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartSession }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(
    Difficulty.Beginner,
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    Category.Object,
  );

  return (
    <div className="space-y-10">
      <header className="text-center">
        <div className="mb-4 inline-block rounded-full bg-surface p-3 shadow-neumorphic-out">
          <EyeIcon className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-wider text-white sm:text-5xl">
          Aetherium
        </h1>
        <p className="mt-2 text-muted">
          AI-assisted sensory-description practice
        </p>
      </header>

      <section aria-labelledby="configure-target-title">
        <h2
          id="configure-target-title"
          className="mb-4 text-center text-2xl font-bold text-white"
        >
          1. Configure the Exercise
        </h2>
        <NeumorphicCard>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                Description Complexity
              </h3>
              <div className="flex flex-wrap gap-1 rounded-xl bg-base p-2 shadow-neumorphic-in">
                {DIFFICULTY_LEVELS.map(({ level }) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedDifficulty(level)}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedDifficulty === level
                        ? 'bg-primary text-white shadow-md'
                        : 'text-muted hover:bg-overlay'
                    }`}
                    aria-pressed={selectedDifficulty === level}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                Target Category
              </h3>
              <div className="flex flex-wrap gap-1 rounded-xl bg-base p-2 shadow-neumorphic-in">
                {CATEGORIES.map(({ name }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSelectedCategory(name)}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === name
                        ? 'bg-primary text-white shadow-md'
                        : 'text-muted hover:bg-overlay'
                    }`}
                    aria-pressed={selectedCategory === name}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 rounded-xl bg-base p-4 text-center text-sm shadow-neumorphic-in">
            <p className="text-muted">
              <span
                className={`font-bold ${
                  DIFFICULTY_LEVELS.find(
                    ({ level }) => level === selectedDifficulty,
                  )?.color
                }`}
              >
                {selectedDifficulty}:
              </span>{' '}
              {
                DIFFICULTY_LEVELS.find(
                  ({ level }) => level === selectedDifficulty,
                )?.description
              }
            </p>
            <p className="text-muted">
              <span className="font-bold text-primary">{selectedCategory}:</span>{' '}
              {
                CATEGORIES.find(({ name }) => name === selectedCategory)
                  ?.description
              }
            </p>
          </div>
        </NeumorphicCard>
      </section>

      <section aria-labelledby="start-practice-title">
        <h2
          id="start-practice-title"
          className="mb-4 text-center text-2xl font-bold text-white"
        >
          2. Start Practice
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {PRACTICE_MODES.map(({ mode, description, Icon }) => (
            <NeumorphicCard
              key={mode}
              interactive
              onClick={() =>
                onStartSession(mode, selectedDifficulty, selectedCategory)
              }
              className="group w-full"
              padding="p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center pr-4">
                  <div className="mr-4 flex-shrink-0 rounded-xl bg-base p-3 shadow-neumorphic-in">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{mode}</h3>
                    <p className="text-sm leading-tight text-muted">
                      {description}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="h-6 w-6 flex-shrink-0 text-muted transition-colors group-hover:text-primary" />
              </div>
            </NeumorphicCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
