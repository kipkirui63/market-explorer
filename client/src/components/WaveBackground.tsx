import React from 'react';

interface WaveBackgroundProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export default function WaveBackground({ position = 'bottom', className = '' }: WaveBackgroundProps) {
  const positionClasses = position === 'top' ? 'top-0 rotate-180' : 'bottom-0';

  return (
    <div className={`absolute left-0 right-0 w-full overflow-hidden ${positionClasses} ${className}`} style={{ height: '60px' }}>
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="fill-current text-background-light"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
  );
}