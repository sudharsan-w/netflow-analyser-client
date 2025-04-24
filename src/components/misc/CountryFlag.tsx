import React from 'react';
import Flag from 'react-world-flags';

interface CountryFlagProps {
  isoCode: string;
  width?: number;
  height?: number;
  className?: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({
  isoCode,
  width = 40,
  height = 30,
  className,
}) => {
  return (
    <Flag
      code={isoCode.toUpperCase()}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={className}
    />
  );
};

export default CountryFlag