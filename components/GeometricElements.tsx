
import React from 'react';
import { motion } from 'framer-motion';

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const GridPattern: React.FC = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-50 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-50"></div>
);

export const DotPattern: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 -z-10 h-full w-full opacity-30 ${className}`} 
    style={{
      backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}
  ></div>
);

export const CornerAccents: React.FC = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-900" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-zinc-900" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-900" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-900" />
  </>
);

export const TechnicalCorner: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 23V1H23" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Crosshair: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative w-6 h-6 flex items-center justify-center ${className}`}>
    <div className="absolute w-full h-[1px] bg-zinc-300"></div>
    <div className="absolute h-full w-[1px] bg-zinc-300"></div>
    <div className="absolute w-2 h-2 border border-zinc-900 rounded-full"></div>
  </div>
);

export const StripedBar: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`h-4 w-32 overflow-hidden ${className}`}>
    <div className="w-full h-full" style={{
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #e4e4e7 5px, #e4e4e7 10px)'
    }}></div>
  </div>
);

export const ConcentricCircles: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <motion.div 
      className="absolute border border-zinc-200 rounded-full w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div 
      className="absolute border border-zinc-300 rounded-full w-[70%] h-[70%] border-dashed"
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute border border-zinc-100 rounded-full w-[40%] h-[40%]" />
  </div>
);
