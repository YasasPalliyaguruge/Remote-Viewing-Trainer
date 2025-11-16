import React from 'react';
import { motion } from 'framer-motion';

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'p-4' | 'p-6' | 'p-8';
  interactive?: boolean;
  onClick?: () => void;
}

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ children, className = '', padding = 'p-6', interactive = false, onClick }) => {
  const cardClasses = `bg-surface rounded-2xl shadow-neumorphic-out transition-all duration-300 ${padding} ${className}`;
  
  if (interactive) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98, boxShadow: 'inset 8px 8px 16px #1c1c1f, inset -8px -8px 16px #28282d' }}
        className={`${cardClasses} cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

export default NeumorphicCard;