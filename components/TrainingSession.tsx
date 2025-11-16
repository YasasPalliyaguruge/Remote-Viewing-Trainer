
import React, { useState, useEffect, useCallback } from 'react';
import type { SessionResult, Target, Difficulty, Category, PracticeMode } from '../types';
import { generateTarget } from '../services/geminiService';
import NeumorphicCard from './ui/NeumorphicCard';
import Button from './ui/Button';
import { LockIcon } from './icons';

interface TrainingSessionProps {
  onFinish: (result: SessionResult) => void;
  difficulty: Difficulty;
  category: Category;
  mode: PracticeMode;
}

const TrainingSession: React.FC<TrainingSessionProps> = ({ onFinish, difficulty, category, mode }) => {
  const [target, setTarget] = useState<Target | null>(null);
  const [userDescription, setUserDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTarget = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedTarget = await generateTarget(difficulty, category);
      setTarget(generatedTarget);
    } catch (err) {
      setError('Failed to generate a target. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [difficulty, category]);

  useEffect(() => {
    fetchTarget();
  }, [fetchTarget]);

  const handleSubmit = async () => {
    if (!target) return;
    // In a real app, the analysis would happen here or be passed to the next component.
    // For simplicity, we pass the raw data to the Feedback component to handle analysis.
    const dummyAnalysis = {
        accuracyRatio: 0,
        strengthOfEvidence: 0,
        statisticalSignificance: 0,
        summary: "Loading analysis...",
        attributeMatches: [],
    };

    onFinish({
      target,
      userDescription,
      aiAnalysis: dummyAnalysis // This will be replaced by a real analysis in FeedbackReveal
    });
  };

  return (
    <NeumorphicCard className="max-w-2xl mx-auto" padding="p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Training Session</h1>
        <p className="text-muted">{mode}</p>
      </div>

      <div className="my-8 p-6 bg-base rounded-xl shadow-neumorphic-in text-center">
        {isLoading && <p className="text-primary animate-pulse">Generating and sealing target...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {target && !isLoading && (
          <div className="flex flex-col items-center">
            <LockIcon className="w-12 h-12 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-semibold text-white">Target Acquired & Sealed</h2>
            <p className="text-muted mt-1">Target ID: {target.id}</p>
            <p className="text-muted">Entropy Score: {target.entropyScore.toFixed(2)}</p>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-lg font-semibold text-white mb-3">
          Record Your Impressions
        </label>
        <textarea
          id="description"
          rows={10}
          value={userDescription}
          onChange={(e) => setUserDescription(e.target.value)}
          placeholder="Describe shapes, colors, textures, sounds, feelings, concepts..."
          className="w-full bg-base p-4 rounded-xl shadow-neumorphic-in text-subtle placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          disabled={isLoading || !!error}
        />
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleSubmit}
          disabled={!userDescription || !target}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Session & Reveal Target
        </Button>
      </div>
    </NeumorphicCard>
  );
};

export default TrainingSession;
