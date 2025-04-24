import React, { useEffect, useRef, ReactNode } from 'react';

type MatchWidthProps = {
  referenceRef: React.RefObject<HTMLElement | null>;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const MatchWidth: React.FC<MatchWidthProps> = ({
  referenceRef,
  children,
  style = {},
  className,
}) => {
  const selfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setWidth = () => {
      if (referenceRef.current && selfRef.current) {
        const refComputedStyle = window.getComputedStyle(referenceRef.current);
        const refWidth = referenceRef.current.getBoundingClientRect().width;

        selfRef.current.style.width = `${refWidth}px`;

        selfRef.current.style.boxSizing = refComputedStyle.boxSizing;
        selfRef.current.style.paddingLeft = refComputedStyle.paddingLeft;
        selfRef.current.style.paddingRight = refComputedStyle.paddingRight;
        // selfRef.current.style.borderLeftWidth = refComputedStyle.borderLeftWidth;
        // selfRef.current.style.borderRightWidth = refComputedStyle.borderRightWidth;
      }
    };

    setWidth();
    window.addEventListener('resize', setWidth);
    return () => window.removeEventListener('resize', setWidth);
  }, [referenceRef]);

  return (
    <div ref={selfRef} style={style} className={className}>
      {children}
    </div>
  );
};

export default MatchWidth;
