import React from 'react';

export const LogoText = ({ className = "" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 400 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* MICKY TRAINING */}
      <text
        x="50%"
        y="40"
        textAnchor="middle"
        fill="white"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: '42px',
          textTransform: 'uppercase',
          letterSpacing: '-0.05em'
        }}
      >
        MICKY TRAINING
      </text>
      
      {/* ELITE PERSONAL TRAINER */}
      <text
        x="50%"
        y="70"
        textAnchor="middle"
        fill="#ff0000"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: '18px',
          textTransform: 'uppercase',
          letterSpacing: '0.27em'
        }}
      >
        ELITE PERSONAL TRAINER
      </text>
      
      {/* SPORT & HEALTH with lines */}
      <g opacity="0.5">
        <line x1="30" y1="88" x2="70" y2="88" stroke="white" strokeWidth="1.5" />
        <text
          x="50%"
          y="92"
          textAnchor="middle"
          fill="white"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.75em'
          }}
        >
          SPORT & HEALTH
        </text>
        <line x1="320" y1="88" x2="370" y2="88" stroke="white" strokeWidth="1.5" />
      </g>
    </svg>
  );
};
