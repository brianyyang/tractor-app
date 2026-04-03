import { StyledMultiSelect } from '@/client/components/Selects/StyledMultiSelect';
import { StyledSelect } from '@/client/components/Selects/StyledSelect';
import { StyledTextInput } from '@/client/components/TextInputs/StyledTextInput';
import { Player } from '@/types/player';
import { Box } from '@mantine/core';

interface NewRoundInputsProps {
  players: Player[];
  dealerTeam: Player[];
  otherTeam: Player[];
  handleDealerTeamChange: (players: string[]) => void;
  pointsScored: string;
  setPointsScored: (points: string) => void;
  dealer: Player | undefined;
  setDealer: (player: Player | undefined) => void;
  dealerKey: number;
}

export const NewRoundInputs = (props: NewRoundInputsProps) => {
  const {
    players,
    dealerTeam,
    otherTeam,
    handleDealerTeamChange,
    pointsScored,
    setPointsScored,
    dealer,
    setDealer,
    dealerKey,
  } = props;
  return (
    <Box>
      <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
        <b>Dealer Team</b>
      </div>
      <StyledMultiSelect
        data={players.map((player) => player.name)}
        value={dealerTeam.map((player) => player.name)}
        onChange={handleDealerTeamChange}
        w={246}
      />
      <div
        style={{
          marginLeft: '1rem',
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          width: '307.5px',
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
      <div style={{ marginLeft: '1rem', marginTop: '2rem' }}>
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
