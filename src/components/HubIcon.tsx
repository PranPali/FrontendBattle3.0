import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const HubIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Dynamic central node */}
      <circle cx="12" cy="12" r="3" />
      {/* Satellite connected nodes */}
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      {/* Connectivity streams */}
      <path d="M7 7l3 3M17 7l-3 3M17 17l-3-3M7 17l3-3" />
    </svg>
  );
};
