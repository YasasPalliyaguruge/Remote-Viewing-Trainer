import React, { useCallback, useEffect, useState } from 'react';
import type {
  Category,
  Difficulty,
  PracticeMode,
  SessionResult,
  Target,
} from '../types';
import Button from './ui/Button';
import NeumorphicCard from './ui/NeumorphicCard';
import { LockIcon } from './icons';

interface TrainingSessionProps {
  onFinish: (result: SessionResult) => void;
  difficulty: Difficulty;
  category: Category;
  mode: PracticeMode;
}

const getTargetErrorMessage = (error: unknown): string => {
  if (
    error instanceof Error &&
    error.message.startsWith('Gemini is not configured')
  ) {
    return error.message;
  }
  return 'The target could not be prepared. Check your connection and try again.';
};

const TrainingSession: React.FC<TrainingSessionProps> = ({
  onFinish,
  difficulty,
  category,
  mode,
}) => {
  const [target, setTarget] = useState<Target | null>(null);
  const [userDescription, setUserDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTarget = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setTarget(null);

    try {
      const { generateTarget } = await import('../services/geminiService');
      setTarget(await generateTarget(difficulty, category));
    } catch (targetError) {
      setError(getTargetErrorMessage(targetError));
    } finally {
      setIsLoading(false);
    }
  }, [category, difficulty]);

  useEffect(() => {
    void fetchTarget();
  }, [fetchTarget]);

  const handleSubmit = () => {
    const description = userDescription.trim();
    if (!target || !description) return;

    onFinish({
      target,
      userDescription: description,
    });
  };

  return (
    <NeumorphicCard className="mx-auto max-w-2xl" padding="p-8">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-white">Training Session</h1>
        <p className="text-muted">{mode}</p>
      </div>

      <div className="my-8 rounded-xl bg-base p-6 text-center shadow-neumorphic-in">
        {isLoading && (
          <p className="animate-pulse text-primary">Preparing a target...</p>
        )}

        {error && !isLoading && (
          <div className="space-y-4" role="alert">
            <p className="text-red-400">{error}</p>
            <Button onClick={() => void fetchTarget()}>Try Again</Button>
          </div>
        )}

        {target && !isLoading && (
          <div className="flex flex-col items-center">
            <LockIcon className="mb-4 h-12 w-12 text-yellow-400" />
            <h2 className="text-2xl font-semibold text-white">Target Ready</h2>
            <p className="mt-1 text-muted">Target ID: {target.id}</p>
            <p className="text-muted">
              Session randomness marker: {target.randomnessMarker.toFixed(2)}
            </p>
            <p className="mt-3 max-w-lg text-xs text-muted">
              The target is kept out of the visible interface until feedback. This
              client-side exercise does not provide cryptographic target sealing.
            </p>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-3 block text-lg font-semibold text-white"
        >
          Record Your Impressions
        </label>
        <textarea
          id="description"
          rows={10}
          value={userDescription}
          onChange={(event) => setUserDescription(event.target.value)}
          placeholder="Describe shapes, colors, textures, sounds, feelings, concepts..."
          className="w-full rounded-xl bg-base p-4 text-subtle shadow-neumorphic-in transition-all placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading || Boolean(error)}
          maxLength={5000}
        />
        <p className="mt-2 text-right text-xs text-muted">
          {userDescription.length.toLocaleString()} / 5,000
        </p>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleSubmit}
          disabled={!userDescription.trim() || !target || isLoading}
          className="disabled:cursor-not-allowed disabled:opacity-50"
        >
          Complete Session & Reveal Target
        </Button>
      </div>
    </NeumorphicCard>
  );
};

export default TrainingSession;
