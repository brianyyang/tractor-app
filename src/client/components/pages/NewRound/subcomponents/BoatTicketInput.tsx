'use client';

import { StyledSelect } from '@/client/components/Selects/StyledSelect';
import { StyledTextInput } from '@/client/components/TextInputs/StyledTextInput';
import { useGame } from '@/client/contexts/GameContext';
import { rankOptions, suitOptions } from '@/types/PlayingCard';
import { BoatTicket } from '@/types/round';
import { ActionIcon, Box, Flex, Stack } from '@mantine/core';
import { IconUsersPlus } from '@tabler/icons-react';
import { useMemo } from 'react';

interface BoatTicketInputProps {
  boatTickets: BoatTicket[];
  setBoatTickets: (boatTickets: BoatTicket[]) => void;
}

export const BoatTicketInput = (props: BoatTicketInputProps) => {
  const { boatTickets, setBoatTickets } = props;
  return (
    <Box>
      <Box display='flex' style={{ alignItems: 'center', marginTop: '1rem' }}>
        <Box fw='bolder' ta='center'>
          Dealer Team
        </Box>
        <ActionIcon
          color='indigo'
          variant='light'
          ml='1rem'
          onClick={() =>
            setBoatTickets([
              ...boatTickets,
              { player: '', card: '', sequence: '' },
            ])
          }
        >
          <IconUsersPlus size={28} />
        </ActionIcon>
      </Box>
      {boatTickets.map((ticket, index) => (
        <Stack key={`ticket_${index}`}>
          <SingleBoatTicket
            boatTicket={ticket}
            onChange={(updatedTicket) => {
              const tickets = [...boatTickets];
              tickets[index] = updatedTicket;
              setBoatTickets(tickets);
            }}
          />
        </Stack>
      ))}
    </Box>
  );
};

interface SingleBoatTicketProps {
  boatTicket: BoatTicket;
  onChange: (updated: BoatTicket) => void;
}

const SingleBoatTicket = ({ boatTicket, onChange }: SingleBoatTicketProps) => {
  const { players } = useGame();
  const cardSplit: string[] = useMemo(() => {
    return boatTicket.card.split(' ');
  }, [boatTicket]);

  const update = (patch: Partial<BoatTicket>) =>
    onChange({ ...boatTicket, ...patch });

  return (
    <Stack pt='1rem'>
      <StyledSelect
        data={players.map((player) => player.name)}
        value={boatTicket.player}
        w={130}
        onChange={(value) => update({ player: value || '' })}
      />
      <Flex align='center' gap='md'>
        <StyledSelect
          data={rankOptions}
          value={cardSplit.length === 3 ? cardSplit[0] : null}
          onChange={(value) => update({ card: `${value} of ${cardSplit[2]}` })}
          w={80}
          searchable
        />
        of
        <StyledSelect
          data={suitOptions}
          value={cardSplit.length === 3 ? cardSplit[2] : null}
          onChange={(value) => update({ card: `${cardSplit[0]} of ${value}` })}
          w={120}
          searchable
        />
      </Flex>
      <StyledTextInput
        value={boatTicket.sequence}
        onChange={(event) => update({ sequence: event.target.value || '' })}
        w={80}
      />
    </Stack>
  );
};
