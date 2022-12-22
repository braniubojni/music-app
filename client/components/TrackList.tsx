import { Grid, List } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ITrack } from '../types/track';
import TrackItem from './TrackItem';

interface ITrackListProps {
  tracks: ITrack[];
}

const TrackList: React.FC<ITrackListProps> = ({ tracks }) => {
  return (
    <List>
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </Box>
    </List>
  );
};

export default TrackList;
