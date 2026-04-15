import { useState, useEffect } from 'react';

interface ProgressBarProps {
  max: number;
  min: number;
  value: number;
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

const ProgressBar = ({ max, min, value }: ProgressBarProps) => {
  const [color, setColor] = useState<string>('blue');

  const percentage = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100)
  );

  const yellowThreshold = 80;
  const orangeThreshold = 90;
  const redThreshold = 100;

  useEffect(() => {
    if (percentage === redThreshold) {
      setColor('red');
    } else if (percentage < redThreshold && percentage >= orangeThreshold) {
      setColor('orange');
    } else if (percentage < orangeThreshold && percentage >= yellowThreshold) {
      setColor('yellow');
    } else {
      setColor('blue');
    }
  }, [percentage]);

  return (
    <div className="relative w-full h-1.5 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-gray-200"></div>

      <div
        className={`absolute left-0 top-0 h-full transition-[width] duration-300 ease-in-out ${colorMap[color] || 'bg-blue-500'}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
