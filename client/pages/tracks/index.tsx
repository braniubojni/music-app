import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { TRACK_CREATE } from '../../common/paths';
import TrackList from '../../components/TrackList';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const Index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      id: '1',
      name: 'Track 1',
      artist: 'Artist 1',
      text: 'some text here',
      listens: 1,
      picture: 'http://localhost:7007/image/a5972120-c812-433c-9aff-09d339b4cca8.jpg',
      audio: 'audio/dcffd57e-d2bd-4aea-acab-9938e0a10d84.mp3',
      comments: [],
    },
    {
      id: '2',
      name: 'Track 2',
      artist: 'Artist 2',
      text: 'some text here',
      listens: 2,
      picture: 'http://localhost:7007/image/ad09a65a-7764-4d96-884c-8a8ac575e67b.jpg',
      audio: 'audio/2f5f04df-1278-47f2-9e9a-f439e1a88d05.mp3',
      comments: [],
    },
    {
      id: '3',
      name: 'Track 3',
      artist: 'Artist 3',
      text: 'some text here',
      listens: 3,
      picture: 'http://localhost:7007/image/6eb131ab-c53d-4241-bee4-4dc056306ff2.jpg',
      audio: 'audio/db0097ee-e05f-4d3d-ae63-d78f43de7489.mp3',
      comments: [],
    },
  ];
  return (
    <MainLayout>
      <Grid container justifyContent={'center'}>
        <Card sx={{ width: '80%' }}>
          <Box p={2}>
            <Grid container justifyContent={'space-between'}>
              <Typography variant="h3">List of tracks</Typography>
              <Button variant="outlined" onClick={() => router.push(TRACK_CREATE)}>Upload</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;
