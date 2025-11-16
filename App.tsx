
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PracticeMode, SessionResult, Difficulty, Category } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import TrainingSession from './components/TrainingSession';
import FeedbackReveal from './components/FeedbackReveal';

type GameState = 
  | { view: 'onboarding' }
  | { view: 'dashboard' }
  | { view: 'session'; mode: PracticeMode; difficulty: Difficulty, category: Category }
  | { view: 'feedback'; result: SessionResult };

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({ view: 'onboarding' });

  const handleStartOnboarding = () => {
    setGameState({ view: 'onboarding' });
  };

  const handleFinishOnboarding = () => {
    setGameState({ view: 'dashboard' });
  };

  const handleStartSession = useCallback((mode: PracticeMode, difficulty: Difficulty, category: Category) => {
    setGameState({ view: 'session', mode, difficulty, category });
  }, []);

  const handleFinishSession = useCallback((result: SessionResult) => {
    setGameState({ view: 'feedback', result });
  }, []);

  const handleReturnToDashboard = () => {
    setGameState({ view: 'dashboard' });
  };

  const renderContent = () => {
    switch (gameState.view) {
      case 'onboarding':
        return <Onboarding onComplete={handleFinishOnboarding} />;
      case 'dashboard':
        return <Dashboard onStartSession={handleStartSession} />;
      case 'session':
        return <TrainingSession onFinish={handleFinishSession} difficulty={gameState.difficulty} category={gameState.category} mode={gameState.mode}/>;
      case 'feedback':
        return <FeedbackReveal result={gameState.result} onReturnToDashboard={handleReturnToDashboard} />;
      default:
        return <Dashboard onStartSession={handleStartSession} />;
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-base via-[#2a2a30] to-base animate-gradient p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
