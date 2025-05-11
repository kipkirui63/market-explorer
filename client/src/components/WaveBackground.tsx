interface WaveBackgroundProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export default function WaveBackground({ position = 'bottom', className = '' }: WaveBackgroundProps) {
  return (
    <div className={`absolute ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'} left-0 w-full h-24 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#90D5FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0099ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGradient)"
          d="M0,224L30,202.7C60,181,120,139,180,144C240,149,300,203,360,197.3C420,192,480,128,540,122.7C600,117,660,171,720,197.3C780,224,840,224,900,213.3C960,203,1020,181,1080,186.7C1140,192,1200,224,1260,213.3C1320,203,1380,149,1410,122.7L1440,96L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}
