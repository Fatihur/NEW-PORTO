import React from 'react';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const GridPattern: React.FC = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-50 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-50"></div>
);

export const CornerAccents: React.FC = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-900" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-zinc-900" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-900" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-900" />
  </>
);