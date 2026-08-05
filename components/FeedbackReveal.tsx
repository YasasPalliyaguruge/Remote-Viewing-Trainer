import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { AIAnalysis, SessionResult } from '../types';
import { analyzeSession } from '../services/geminiService';
import Button from './ui/Button';
import NeumorphicCard from './ui/NeumorphicCard';
import ProgressBar from './ui/ProgressBar';

interface FeedbackRevealProps {
  result: SessionResult;
  onReturnToDashboard: () => void;
}

const getAnalysisErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'The AI-assisted comparison could not be generated.';
};

const FeedbackReveal: React.FC<FeedbackRevealProps> = ({
  result,
  onReturnToDashboard,
}) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      setAnalysis(
        await analyzeSession(
          result.target.description,
          result.userDescription,
        ),
      );
    } catch (analysisError) {
      setError(getAnalysisErrorMessage(analysisError));
    } finally {
      setIsLoading(false);
    }
  }, [result.target.description, result.userDescription]);

  useEffect(() => {
    void runAnalysis();
  }, [runAnalysis]);

  const renderAttributeMatches = () => {
    if (!analysis?.attributeMatches.length) return null;

    return (
      <div className="space-y-2">
        {analysis.attributeMatches.map((item, index) => (
          <div
            key={`${item.attribute}-${index}`}
            className="flex items-center justify-between rounded-lg bg-base p-3 shadow-neumorphic-in-sm"
          >
            <span className="flex-1 text-muted">{item.attribute}</span>
            <div className="flex items-center gap-4">
              <span
                className={`h-4 w-4 rounded-full ${item.targetPresence ? 'bg-blue-400' : 'bg-overlay'}`}
                title="Present in target text"
                aria-label={
                  item.targetPresence
                    ? 'Present in target text'
                    : 'Not present in target text'
                }
              />
              <span
                className={`h-4 w-4 rounded-full ${item.userPresence ? 'bg-purple-400' : 'bg-overlay'}`}
                title="Present in your description"
                aria-label={
                  item.userPresence
                    ? 'Present in your description'
                    : 'Not present in your description'
                }
              />
              <span
                className={`rounded px-2 py-1 text-xs font-bold ${
                  item.match
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {item.match ? 'OVERLAP' : 'MISS'}
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-4 pt-2 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-400" />
            Target text
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-purple-400" />
            Your text
          </div>
        </div>
      </div>
    );
  };

  return (
    <NeumorphicCard padding="p-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-white">
        Session Feedback
      </h1>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <NeumorphicCard
          className="bg-base shadow-neumorphic-in"
          padding="p-4"
        >
          <h2 className="mb-2 text-xl font-semibold text-primary">
            Target Description
          </h2>
          <p className="whitespace-pre-wrap font-mono text-sm text-subtle">
            {result.target.description}
          </p>
        </NeumorphicCard>

        <NeumorphicCard
          className="bg-base shadow-neumorphic-in"
          padding="p-4"
        >
          <h2 className="mb-2 text-xl font-semibold text-purple-400">
            Your Description
          </h2>
          <p className="whitespace-pre-wrap font-mono text-sm text-subtle">
            {result.userDescription}
          </p>
        </NeumorphicCard>
      </div>

      <NeumorphicCard className="bg-overlay">
        <h2 className="mb-2 text-2xl font-bold text-white">
          AI-Assisted Comparison
        </h2>
        <p className="mb-4 text-sm text-muted">
          These values are model-generated heuristics for reflection. They are not
          scientific measurements, statistical significance tests, or evidence of
          paranormal ability.
        </p>

        {isLoading && (
          <div className="p-8 text-center" aria-live="polite">
            <p className="animate-pulse text-primary">
              Comparing the two descriptions...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="space-y-4 p-8 text-center" role="alert">
            <p className="text-red-400">{error}</p>
            <Button onClick={() => void runAnalysis()}>Try Analysis Again</Button>
          </div>
        )}

        {analysis && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-6 text-center italic text-subtle">
              {analysis.summary}
            </p>
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <ProgressBar
                label="Descriptive Similarity"
                value={analysis.similarityScore * 100}
              />
              <ProgressBar
                label="Evidence Specificity"
                value={analysis.evidenceScore * 100}
              />
              <ProgressBar
                label="Distinctiveness Estimate"
                value={analysis.distinctivenessScore * 100}
              />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Attribute Comparison
            </h3>
            {renderAttributeMatches()}
          </motion.div>
        )}
      </NeumorphicCard>

      <div className="mt-8 text-center">
        <Button onClick={onReturnToDashboard}>Return to Dashboard</Button>
      </div>
    </NeumorphicCard>
  );
};

export default FeedbackReveal;
