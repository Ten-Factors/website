import React from 'react';

const Container = ({ 
  children, 
  size = 'default',
  className = '', 
  ...props 
}) => {
  const baseClasses = 'mx-auto px-4 sm:px-6 lg:px-8';
  
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-full',
    full: 'w-full',
  };
  
  const classes = `${baseClasses} ${sizes[size]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;
