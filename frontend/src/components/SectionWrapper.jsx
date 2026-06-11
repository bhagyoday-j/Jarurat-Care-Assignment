import React from 'react';
import { useFadeUp } from '../hooks/useFadeUp';

const SectionWrapper = ({ children, className = '' }) => {
  const { ref, isVisible } = useFadeUp();

  return (
    <section
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
