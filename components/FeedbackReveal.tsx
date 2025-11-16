
import React, { useState, useEffect } from 'react';
import type { SessionResult, AIAnalysis } from '../types';
import { analyzeSession } from '../services/geminiService';
import NeumorphicCard from './ui/NeumorphicCard';
import Button from './ui/Button';
import ProgressBar from './ui/ProgressBar';
import { motion } from 'framer-motion';

interface FeedbackRevealProps {
  result: SessionResult;
  onReturnToDashboard: () => void;
}

const FeedbackReveal: React.FC<FeedbackRevealProps> = ({ result, onReturnToDashboard }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnalysis = async () => {
      setIsLoading(true);
      const sessionAnalysis = await analyzeSession(result.target.description, result.userDescription);
      setAnalysis(sessionAnalysis);
      setIsLoading(false);
    };
    getAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.target.description, result.userDescription]);

  const renderAttributeMatches = () => {
    if (!analysis || !analysis.attributeMatches) return null;

    return (
      <div className="space-y-2">
        {analysis.attributeMatches.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-base p-3 rounded-lg shadow-neumorphic-in-sm">
            <span className="text-muted flex-1">{item.attribute}</span>
            <div className="flex items-center gap-4">
                <span className={`w-4 h-4 rounded-full ${item.targetPresence ? 'bg-blue-400' : 'bg-overlay'}`} title="Present in Target"></span>
                <span className={`w-4 h-4 rounded-full ${item.userPresence ? 'bg-purple-400' : 'bg-overlay'}`} title="Present in Your Description"></span>
                <span className={`font-bold text-xs px-2 py-1 rounded ${item.match ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {item.match ? 'MATCH' : 'MISS'}
                </span>
            </div>
          </div>
        ))}
        <div className="flex justify-end gap-4 text-xs pt-2 text-muted">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-400"></span>Target</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-400"></span>You</div>
        </div>
      </div>
    );
  };


  return (
    <NeumorphicCard padding="p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Session Feedback</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <NeumorphicCard className="bg-base shadow-neumorphic-in" padding="p-4">
          <h2 className="text-xl font-semibold text-primary mb-2">Target Data</h2>
          <p className="text-subtle whitespace-pre-wrap font-mono text-sm">{result.target.description}</p>
        </NeumorphicCard>
        <NeumorphicCard className="bg-base shadow-neumorphic-in" padding="p-4">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Your Description</h2>
          <p className="text-subtle whitespace-pre-wrap font-mono text-sm">{result.userDescription}</p>
        </NeumorphicCard>
      </div>

      <NeumorphicCard className="bg-overlay">
        <h2 className="text-2xl font-bold text-white mb-4">AI Analysis</h2>
        {isLoading || !analysis ? (
          <div className="text-center p-8">
            <p className="animate-pulse text-primary">AI is analyzing your session...</p>
          </div>
        ) : (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
            <p className="mb-6 text-subtle text-center italic">"{analysis.summary}"</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <ProgressBar label="Accuracy Ratio" value={analysis.accuracyRatio * 100} />
              <ProgressBar label="Strength of Evidence" value={analysis.strengthOfEvidence * 100} />
              <ProgressBar label="Significance" value={(1 - analysis.statisticalSignificance) * 100} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Attribute Matching</h3>
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
