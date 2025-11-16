
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0 to 100
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => {
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-muted">{label}</span>
        <span className="text-sm font-bold text-subtle">{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-base rounded-full h-2.5 shadow-neumorphic-in-sm">
        <motion.div
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
