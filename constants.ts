
import React from 'react';
// Fix: Changed type-only import to value import to access enum members.
import { Difficulty, Category, PracticeMode } from './types';
import { TargetIcon, ClockIcon, TrophyIcon, UsersIcon } from './components/icons';

export const DIFFICULTY_LEVELS: { level: Difficulty; description: string; color: string }[] = [
  // Fix: Used enum members instead of string literals.
  { level: Difficulty.Beginner, description: 'Basic shapes and colors.', color: 'text-green-400' },
  { level: Difficulty.Intermediate, description: 'Complex objects and simple scenes.', color: 'text-blue-400' },
  { level: Difficulty.Advanced, description: 'Dynamic locations and sensory data.', color: 'text-purple-400' },
  { level: Difficulty.Expert, description: 'Historical events and abstract feelings.', color: 'text-yellow-400' },
  { level: Difficulty.Master, description: 'Abstract concepts and timelines.', color: 'text-red-400' },
];

export const CATEGORIES: { name: Category; description: string }[] = [
    // Fix: Used enum members instead of string literals.
    { name: Category.Object, description: 'Focus on form, texture, color, and sound.'},
    { name: Category.Location, description: 'Explore distinct geographical or architectural places.'},
    { name: Category.Event, description: 'Perceive moments in time, past or present.'},
];

// Fix: Imported React to resolve errors with React.FC and React.SVGProps.
export const PRACTICE_MODES: { mode: PracticeMode; description: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  // Fix: Used enum members instead of string literals.
  { mode: PracticeMode.Solo, description: 'A standard, self-paced session.', Icon: TargetIcon },
  { mode: PracticeMode.Timed, description: 'Race against the clock to capture impressions.', Icon: ClockIcon },
  { mode: PracticeMode.Tournament, description: 'Compete on global leaderboards.', Icon: TrophyIcon },
  { mode: PracticeMode.Collaborative, description: 'Work with others to describe a single target.', Icon: UsersIcon },
];
