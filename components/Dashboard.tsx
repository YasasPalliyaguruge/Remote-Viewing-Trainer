import React, { useState } from 'react';
import type { PracticeMode, Difficulty, Category } from '../types';
import { PRACTICE_MODES, DIFFICULTY_LEVELS, CATEGORIES } from '../constants';
import NeumorphicCard from './ui/NeumorphicCard';
import { ChevronRightIcon, EyeIcon } from './icons';

interface DashboardProps {
  onStartSession: (mode: PracticeMode, difficulty: Difficulty, category: Category) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartSession }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Beginner');
    const [selectedCategory, setSelectedCategory] = useState<Category>('Sensory-rich Object');

    const handleStart = (mode: PracticeMode) => {
        onStartSession(mode, selectedDifficulty, selectedCategory);
    };

    return (
        <div className="space-y-10">
            <header className="text-center">
                <div className="inline-block p-3 bg-surface rounded-full shadow-neumorphic-out mb-4">
                    <EyeIcon className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wider">Aetherium</h1>
                <p className="text-muted mt-2">Remote Viewing Training Protocol</p>
            </header>

            <section>
                <h2 className="text-2xl font-bold text-white text-center mb-4">1. Configure Target</h2>
                <NeumorphicCard>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Target Complexity</h3>
                            <div className="bg-base p-2 rounded-xl shadow-neumorphic-in flex flex-wrap gap-1">
                                {DIFFICULTY_LEVELS.map(({ level }) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedDifficulty(level)}
                                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                            selectedDifficulty === level ? 'bg-primary text-white shadow-md' : 'text-muted hover:bg-overlay'
                                        }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Target Category</h3>
                            <div className="bg-base p-2 rounded-xl shadow-neumorphic-in flex flex-wrap gap-1">
                                {CATEGORIES.map(({ name }) => (
                                    <button
                                        key={name}
                                        onClick={() => setSelectedCategory(name)}
                                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                            selectedCategory === name ? 'bg-primary text-white shadow-md' : 'text-muted hover:bg-overlay'
                                        }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 bg-base p-4 rounded-xl shadow-neumorphic-in text-center space-y-2 text-sm">
                        <p className="text-muted"><span className={`font-bold ${DIFFICULTY_LEVELS.find(d => d.level === selectedDifficulty)?.color}`}>{selectedDifficulty}:</span> {DIFFICULTY_LEVELS.find(d => d.level === selectedDifficulty)?.description}</p>
                        <p className="text-muted"><span className="font-bold text-primary">{selectedCategory}:</span> {CATEGORIES.find(c => c.name === selectedCategory)?.description}</p>
                    </div>
                </NeumorphicCard>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white text-center mb-4">2. Choose Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PRACTICE_MODES.map(({ mode, description, Icon }) => (
                        <NeumorphicCard
                            key={mode}
                            interactive
                            onClick={() => handleStart(mode)}
                            className="w-full group"
                            padding="p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center pr-4">
                                    <div className="p-3 bg-base rounded-xl shadow-neumorphic-in mr-4 flex-shrink-0">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{mode}</h3>
                                        <p className="text-muted text-sm leading-tight">{description}</p>
                                    </div>
                                </div>
                                <ChevronRightIcon className="w-6 h-6 text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                            </div>
                        </NeumorphicCard>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;