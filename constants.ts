import React from 'react';
import { Category, Difficulty, PracticeMode } from './types';
import { TargetIcon } from './components/icons';

export const DIFFICULTY_LEVELS: {
  level: Difficulty;
  description: string;
  color: string;
}[] = [
  {
    level: Difficulty.Beginner,
    description: 'Basic shapes and colors.',
    color: 'text-green-400',
  },
  {
    level: Difficulty.Intermediate,
    description: 'Common objects described through sensory details.',
    color: 'text-blue-400',
  },
  {
    level: Difficulty.Advanced,
    description: 'Dynamic locations and atmospheric sensory details.',
    color: 'text-purple-400',
  },
  {
    level: Difficulty.Expert,
    description: 'Events, emotions, and surreal scenes.',
    color: 'text-yellow-400',
  },
  {
    level: Difficulty.Master,
    description: 'Abstract concepts expressed through metaphor.',
    color: 'text-red-400',
  },
];

export const CATEGORIES: { name: Category; description: string }[] = [
  {
    name: Category.Object,
    description: 'Focus on form, texture, color, sound, and temperature.',
  },
  {
    name: Category.Location,
    description: 'Explore environmental, architectural, and atmospheric cues.',
  },
  {
    name: Category.Event,
    description: 'Explore the sensory and emotional atmosphere of a moment.',
  },
];

export const PRACTICE_MODES: {
  mode: PracticeMode;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    mode: PracticeMode.Solo,
    description: 'A self-paced sensory-description comparison exercise.',
    Icon: TargetIcon,
  },
];
