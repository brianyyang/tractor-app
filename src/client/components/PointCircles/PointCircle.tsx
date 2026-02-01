'use client';

import { ReactNode } from 'react';

interface PointCircleProps {
  isDealer: boolean;
  isOnDealersTeam: boolean;
  children: ReactNode;
}

export const PointCircle = ({
  isDealer,
  isOnDealersTeam,
  children,
}: PointCircleProps) => {
  return (
    <div
      style={{
        border: isOnDealersTeam ? '2px solid #8ba2ff' : 'none',
        borderRadius: '50%',
        padding: '10px 20px',
        display: 'inline-block',
        textAlign: 'center',
        boxShadow: isDealer ? 'inset 0 0 0 2px #8ba2ff' : 'none',
      }}
    >
      {children}
    </div>
  );
};
