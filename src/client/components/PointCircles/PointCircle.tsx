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
        borderRadius: isDealer ? '10% ' : '50%',
        padding: '10px 20px',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};
