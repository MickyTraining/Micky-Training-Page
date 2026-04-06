import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-4 group cursor-pointer shrink-0 ${className}`} translate="no">
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 border-4 border-red-600 rounded-xl rotate-45 shadow-[0_0_20px_rgba(220,38,38,0.4)]"></div>
        <div className="absolute inset-0 border-2 border-white/20 rounded-xl rotate-12"></div>
        <span className="text-[14px] font-black text-white tracking-tighter z-10 drop-shadow-md">MTC</span>
      </div>
      <div className="flex flex-col leading-none min-w-max">
        <div className="flex items-baseline gap-1">
          <span className="font-black text-[23px] tracking-tighter uppercase text-white italic inline-block transform scale-y-[1.10] origin-bottom whitespace-nowrap drop-shadow-lg">MICKY TRAINING</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-[9px] font-bold text-red-600 uppercase tracking-[0.39em] w-full text-center whitespace-nowrap drop-shadow-sm">ELITE PERSONAL TRAINER</span>
        </div>
        <div className="flex items-center gap-1 mt-1 opacity-40 w-full">
          <div className="h-[1px] w-4 bg-white"></div>
          <span className="text-[8px] font-medium text-white uppercase tracking-[0.55em] flex-1 text-center">Sport & Health</span>
          <div className="h-[1px] w-4 bg-white"></div>
        </div>
      </div>
    </div>
  );
};
