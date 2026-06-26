'use client';

import { StyledSelect } from '@/client/components/Selects/StyledSelect';
import { StyledTextInput } from '@/client/components/TextInputs/StyledTextInput';
import { useGame } from '@/client/contexts/GameContext';
import { rankOptions, suitOptions } from '@/types/PlayingCard';
import { BoatTicket } from '@/types/round';
import { ActionIcon, Box, Divider, Flex, Stack } from '@mantine/core';
import { IconUsersMinus, IconUsersPlus, IconX } from '@tabler/icons-react';
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
          color='white'
          variant='light'
          ml='0.5rem'
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
            onRemove={() => {
              setBoatTickets(boatTickets.toSpliced(index, 1));
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
  onRemove: () => void;
}

const SingleBoatTicket = ({
  boatTicket,
  onChange,
  onRemove,
}: SingleBoatTicketProps) => {
  const { players } = useGame();
  const cardSplit: string[] = useMemo(() => {
    return boatTicket.card.split(' ');
  }, [boatTicket]);

  const update = (patch: Partial<BoatTicket>) =>
    onChange({ ...boatTicket, ...patch });

  return (
    <Stack>
      <Divider mt='1rem' />
      <Flex justify='space-between'>
        <StyledSelect
          data={players.map((player) => player.name)}
          value={boatTicket.player}
          w={130}
          onChange={(value) => update({ player: value || '' })}
          label='Player'
        />
        <ActionIcon
          color='white'
          variant='light'
          mt='0.5rem'
          onClick={onRemove}
        >
          <IconX size={24} />
        </ActionIcon>
      </Flex>
      <Flex align='flex-end' gap='md'>
        <StyledSelect
          data={rankOptions}
          value={cardSplit.length === 3 ? cardSplit[0] : null}
          onChange={(value) => update({ card: `${value} of ${cardSplit[2]}` })}
          w={80}
          searchable
          label='Card'
        />
        <span style={{ paddingBottom: '0.5rem' }}>of</span>
        <StyledSelect
          data={suitOptions}
          value={cardSplit.length === 3 ? cardSplit[2] : null}
          onChange={(value) => update({ card: `${cardSplit[0]} of ${value}` })}
          w={120}
          searchable
          label='Suit'
        />
      </Flex>
      <StyledTextInput
        value={boatTicket.sequence}
        onChange={(event) => update({ sequence: event.target.value || '' })}
        w={80}
        label='Sequence'
      />
    </Stack>
  );
};
