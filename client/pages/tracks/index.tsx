import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { TRACK_CREATE } from '../../common/paths';
import TrackList from '../../components/TrackList';
import { useTypedSelecors } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks } from '../../store/action-creators/track';

const Index = () => {
  const router = useRouter();
  const { tracks, error } = useTypedSelecors((state) => state.tracks);
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
