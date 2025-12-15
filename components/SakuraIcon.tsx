import React from 'react';

export const SakuraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor"
  >
    <path d="M50,45 C45,30 20,20 20,40 C20,55 45,55 50,55 C55,55 80,55 80,40 C80,20 55,30 50,45 Z" />
    <path d="M50,45 C55,30 80,20 80,40 C80,55 55,55 50,55 C45,55 20,55 20,40 C20,20 45,30 50,45 Z" transform="rotate(72 50 50)" />
    <path d="M50,45 C55,30 80,20 80,40 C80,55 55,55 50,55 C45,55 20,55 20,40 C20,20 45,30 50,45 Z" transform="rotate(144 50 50)" />
    <path d="M50,45 C55,30 80,20 80,40 C80,55 55,55 50,55 C45,55 20,55 20,40 C20,20 45,30 50,45 Z" transform="rotate(216 50 50)" />
    <path d="M50,45 C55,30 80,20 80,40 C80,55 55,55 50,55 C45,55 20,55 20,40 C20,20 45,30 50,45 Z" transform="rotate(288 50 50)" />
    <circle cx="50" cy="50" r="5" fill="#FFF" opacity="0.6" />
  </svg>
);
