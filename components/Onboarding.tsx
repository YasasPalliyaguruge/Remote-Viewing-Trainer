
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import NeumorphicCard from './ui/NeumorphicCard';
import { EyeIcon } from './icons';

const onboardingSteps = [
  {
    title: 'Welcome to Aetherium',
    text: 'This is a training system designed to help you practice and develop your remote viewing skills, based on declassified CIA methodologies.',
  },
  {
    title: 'The Process',
    text: 'You will be given a cryptographically-sealed "target". Your goal is to quiet your mind and describe the impressions you receive about it—shapes, colors, textures, sounds, or feelings.',
  },
  {
    title: 'AI-Powered Feedback',
    text: 'After each session, your description will be compared against the target data. Our AI will provide a detailed analysis of your accuracy to help you track your progress.',
  },
  {
    title: 'Ready to Begin?',
    text: 'Focus your intent. Trust your intuition. Your first target is waiting.',
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <NeumorphicCard className="w-full max-w-md text-center" padding="p-8">
        <div className="mb-6 flex justify-center">
            <div className="p-4 bg-base rounded-full shadow-neumorphic-in">
                <EyeIcon className="w-10 h-10 text-primary" />
            </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">{onboardingSteps[step].title}</h2>
            <p className="text-muted leading-relaxed">{onboardingSteps[step].text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <Button onClick={handleNext}>
            {step < onboardingSteps.length - 1 ? 'Continue' : 'Enter the Aetherium'}
          </Button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
            {onboardingSteps.map((_, index) => (
                <div key={index} className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${step === index ? 'bg-primary' : 'bg-base shadow-neumorphic-in-sm'}`}></div>
            ))}
        </div>
      </NeumorphicCard>
    </div>
  );
};

export default Onboarding;
