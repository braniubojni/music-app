import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { Context } from 'next-redux-wrapper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { backEndUrl, backStatic } from '../../common/env.constants';
import { TRACKS } from '../../common/paths';
import MainLayout from '../../layouts/MainLayout';
import { IComment, ITrack } from '../../types/track';

// @ts-ignore
const TrackPage = ({ pageProps: { serverTrack } }) => {
  const router = useRouter();
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [err, setErr] = useState(false);

  const addComment = async () => {
    try {
      if (!username || !text) {
        setErr(true);
        return;
      }
      const response = await axios.post(backEndUrl + TRACKS + '/comment', {
        username: username,
        text: text,
        trackId: track.id,
      });
      setTrack({ ...track, comments: [...track.comments, response.data] });
      setText('');
      setErr(false);
    } catch (e) {
      console.log(e, 'Error while posting comment');
    }
  };

  return (
    <MainLayout
      keywords={`Music, artists, ${track.name},${track.artist}`}
      title={'Music Platform - ' + track.name + '/' + track.artist}
    >
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
          src={`${backStatic}/${track.picture}`}
        />
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
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ paddingBottom: '15px' }}
          fullWidth
          label="Your name"
          error={err}
        />
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ paddingBottom: '10px' }}
          fullWidth
          multiline
          rows={4}
          label="Comments"
          error={err}
        />
        <Button onClick={addComment} variant="outlined">
          Send
        </Button>
      </Grid>
      <Box component={'div'}>
        {track?.comments?.map((comment: IComment) => (
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

export async function getServerSideProps(context: Context) {
  //@ts-ignore
  const resp = await axios.get(`${backEndUrl}${TRACKS}/` + context.params.id);
  return {
    props: {
      serverTrack: resp.data,
    },
  };
}
