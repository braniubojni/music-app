import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import { TRACKS } from '../../common/paths';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const TrackPage = () => {
  const router = useRouter();
  const track: ITrack = {
    id: '3',
    name: 'Track 3',
    artist: 'Artist 3',
    text: 'some text here',
    listens: 3,
    picture:
      'http://localhost:7007/image/6eb131ab-c53d-4241-bee4-4dc056306ff2.jpg',
    audio: 'audio/db0097ee-e05f-4d3d-ae63-d78f43de7489.mp3',
    comments: [],
  };
  return (
    <MainLayout>
      <Button
        sx={{ fontSize: 18 }}
        variant="outlined"
        onClick={() => router.push(TRACKS)}
      >
        To the list
      </Button>
      <Grid container sx={{ margin: '3% 0' }}>
        <Box
          width={200}
          height={'auto'}
          component={'img'}
          border={'1px solid black'}
          src={track.picture}
        ></Box>
        <Box marginLeft={'2%'}>
          <Box component={'h1'}>Track name - {track.name}</Box>
          <Box component={'h1'}>Artist - {track.artist}</Box>
          <Box component={'h1'}>Listens - {track.listens}</Box>
        </Box>
      </Grid>

      <Box component={'h1'}>Track text</Box>
      <Box component={'p'}>{track.text}</Box>
      <Box component={'h1'}>Comments</Box>
      <Grid margin={1} container>
        <TextField sx={{ paddingBottom: '15px' }} fullWidth label="Your name" />
        <TextField
          sx={{ paddingBottom: '10px' }}
          fullWidth
          multiline
          rows={4}
          label="Comments"
        />
        <Button variant="outlined">Send</Button>
      </Grid>
      <Box component={'div'}>
        {track.comments.map((comment) => (
          <Box key={comment.id} component={'div'}>
            <Box component={'div'}>Author - {comment.username}</Box>
            <Box component={'div'}>Author - {comment.text}</Box>
          </Box>
        ))}
      </Box>
    </MainLayout>
  );
};

export default TrackPage;
