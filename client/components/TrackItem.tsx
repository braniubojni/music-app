import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import {
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar, ListItemText
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { TRACKS } from '../common/paths';
import { ITrack } from '../types/track';

interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<ITrackItemProps> = ({ active = false, track }) => {
  const router = useRouter();
  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        m: 1.5,
        cursor: 'pointer',
      }}
      onClick={() => router.push(TRACKS + `/${track.id}`)}
    >
      <IconButton onClick={(e) => e.stopPropagation()}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <ListItemAvatar>
        <Avatar src={track.picture}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={track.name} secondary={track.artist} />
      {active && <div>02:42 / 03:32</div>}
      <IconButton onClick={(e) => e.stopPropagation()}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default TrackItem;
