'use client';

import { StyledMultiSelect } from '@/client/components/Selects/StyledMultiSelect';
import { StyledSelect } from '@/client/components/Selects/StyledSelect';
import { StyledTextInput } from '@/client/components/TextInputs/StyledTextInput';
import { Player } from '@/types/player';
import { Box } from '@mantine/core';
import { BoatTicketInput } from './BoatTicketInput';
import { BoatTicket } from '@/types/round';

interface NewRoundInputsProps {
  players: Player[];
  otherTeam: Player[];
  pointsScored: string;
  setPointsScored: (points: string) => void;
  dealer: Player | undefined;
  setDealer: (player: Player | undefined) => void;
  dealerKey: number;
  boatTickets: BoatTicket[];
  setBoatTickets: (boatTickets: BoatTicket[]) => void;
}

export const NewRoundInputs = (props: NewRoundInputsProps) => {
  const {
    players,
    otherTeam,
    pointsScored,
    setPointsScored,
    dealer,
    setDealer,
    dealerKey,
    boatTickets,
    setBoatTickets,
  } = props;
  return (
    <Box>
      <div
        style={{
          marginTop: '1rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <b>Points Scored</b>
        <b>Dealer</b>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledTextInput
          value={pointsScored}
          w={80}
          onChange={(input) => setPointsScored(input.target.value)}
        />
        <StyledSelect
          key={dealerKey}
          data={players.map((player) => player.name)}
          value={dealer ? dealer.name : ''}
          w={130}
          onChange={(value) =>
            setDealer(players.find((player) => player.name === value))
          }
        />
      </div>
      <BoatTicketInput
        boatTickets={boatTickets}
        setBoatTickets={setBoatTickets}
      />
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <b>Other Team</b>
      </div>
      <StyledMultiSelect
        data={players.map((player) => player.name)}
        value={otherTeam.map((player) => player.name)}
        w={246}
        disabled
      />
    </Box>
  );
};
