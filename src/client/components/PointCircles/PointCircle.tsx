'use client';

import { stringToShortString } from '@/types/PlayingCard';
import { BoatTicket } from '@/types/round';
import { CSSProperties, ReactNode, useState } from 'react';

interface PointCircleProps {
  isDealer: boolean;
  isOnDealersTeam: boolean;
  boatTicket?: BoatTicket;
  children: ReactNode;
}

export const PointCircle = ({
  isDealer,
  isOnDealersTeam,
  boatTicket,
  children,
}: PointCircleProps) => {
  const [showBoatTicket, setShowBoatTicket] = useState<boolean>(false);

  const boxStyles = {
    border:
      isDealer || isOnDealersTeam
        ? '2px solid #8ba2ff'
        : '2px solid transparent',
    borderRadius: isDealer ? '10% ' : '50%',
    padding: '10px 20px',
    display: 'inline-block',
    textAlign: 'center',
    cursor: isOnDealersTeam ? 'pointer' : 'default',
  } as CSSProperties;

  return showBoatTicket ? (
    <div style={boxStyles} onClick={() => setShowBoatTicket(false)}>
      <span>{stringToShortString(boatTicket?.card || '')}</span>
      <span>{boatTicket?.sequence}</span>
    </div>
  ) : (
    <div
      style={boxStyles}
      onClick={() => isOnDealersTeam && setShowBoatTicket(true)}
    >
      {children}
    </div>
  );
};
