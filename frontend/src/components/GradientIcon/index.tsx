// GradientIcon.jsx
import React from 'react';

interface Prop {
  children: React.ReactNode;
}

const GradientIcon: React.FC<Prop> = ({ children }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="red">
            <animate
              attributeName="stop-color"
              values="red;yellow;green;red"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="yellow">
            <animate
              attributeName="stop-color"
              values="yellow;green;red;yellow"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="green">
            <animate
              attributeName="stop-color"
              values="green;red;yellow;green"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      {React.cloneElement(children as React.ReactElement, {
        fill: 'url(#grad1)',
      })}
    </svg>
  );
};

export default GradientIcon;
