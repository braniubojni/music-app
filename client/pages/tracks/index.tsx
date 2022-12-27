import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TRACK_CREATE } from '../../common/paths';
import TrackList from '../../components/TrackList';
import { useTypedSelecors } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTrack } from '../../store/action-creators/track';

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelecors((state) => state.tracks);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch() as NextThunkDispatch;

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTrack(val));
      }, 500)
    );
  };
  if (error) {
    <MainLayout>
      <Box component={'h1'}>{error}</Box>
    </MainLayout>;
  }
  return (
    <MainLayout>
      <Grid container justifyContent={'center'}>
        <Card sx={{ width: '80%' }}>
          <Box p={2}>
            <Grid container justifyContent={'space-between'}>
              <Typography variant="h3">List of tracks</Typography>
              <Button
                variant="outlined"
                onClick={() => router.push(TRACK_CREATE)}
              >
                Upload
              </Button>
            </Grid>
          </Box>
          <TextField fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  //@ts-ignore
  (store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    //@ts-ignore
    await dispatch(await fetchTracks());
  }
);
