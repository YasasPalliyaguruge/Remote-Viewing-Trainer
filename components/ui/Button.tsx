
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-subtle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base';
  
  const variantClasses = {
    primary: 'bg-primary shadow-neumorphic-out-sm hover:bg-primary-hover hover:text-white',
    secondary: 'bg-surface shadow-neumorphic-out-sm hover:bg-overlay',
  };

  const tapEffect = {
    scale: 0.95,
    boxShadow: variant === 'primary' 
      ? 'inset 4px 4px 8px #6f5fde, inset -4px -4px 8px #a999ff'
      : 'inset 4px 4px 8px #1c1c1f, inset -4px -4px 8px #28282d'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={tapEffect}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
