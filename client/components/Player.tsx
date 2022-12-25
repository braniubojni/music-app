import AddIcon from '@mui/icons-material/Add';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useActions } from '../hooks/useAction';

import { useTypedSelecors } from '../hooks/useTypedSelector';
import VolumeSlider from './VolumeSlider';

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

let audio: HTMLAudioElement;

const Player = () => {
  const theme = useTheme();
  const [showVolume, setShowVolume] = useState(false);
  // const [volume, setVolume] = useState(30);
  const { pause, volume, active, currentTime, duration } = useTypedSelecors(
    (state) => state.player
  );
  const {
    pauseTrack,
    playTrack,
    setActiveTrack,
    setCurrentTime,
    setDuration,
    setVolume,
  } = useActions();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active]);
  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  const volumeChange = (value: number) => {
    if (volume !== 1) {
      audio.volume = Number(value) / 100;
      setVolume(value);
    }
  };
  const changeCurrentTime = (value: number) => {
    audio.currentTime = value;
    setCurrentTime(value);
  };
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const volPlus = () => {
    if (volume !== 100) {
      audio.volume = Number(volume) / 100 + 0.02;
      setVolume(volume + 2);
    }
  };
  const volMinus = () => {
    if (volume !== 0) {
      audio.volume = Number(volume) / 100 - 0.02;
      setVolume(volume - 2);
    }
  };
  const setAudio = () => {
    if (active) {
      audio.src = active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  if (!active) {
    return null;
  }
  return (
    <Box sx={{ p: '0 10px', bottom: 0, width: '100%', position: 'fixed' }}>
      <Box sx={{ width: '100%', position: 'relative', paddingBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={active?.picture} />
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {active?.artist}
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {active?.name}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => changeCurrentTime(value as number)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(currentTime)}</TinyText>
          <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton sx={{ p: 0 }} aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            sx={{ p: 0 }}
            aria-label={pause ? 'play' : 'pause'}
            onClick={play}
          >
            {pause ? (
              <PlayArrowRounded
                sx={{ fontSize: '2.5rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: '2.5rem' }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton sx={{ p: 0 }} aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Box sx={{ position: 'relative', height: 'auto' }} width={'100%'}>
          <VolumeDownRounded
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              right: '3vw',
              top: '-5vh',
            }}
            onClick={() => setShowVolume((prev) => !prev)}
            htmlColor={showVolume ? mainIconColor : lightIconColor}
          />
          <Stack
            spacing={2}
            direction="row"
            sx={{ px: 1, position: 'relative', zIndex: 10 }}
            alignItems="center"
          >
            {showVolume && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '95%',
                    bottom: '9vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'opacity .5s',
                  }}
                >
                  <AddIcon
                    onClick={volPlus}
                    sx={{ cursor: 'pointer', marginBottom: 1 }}
                  />
                  <VolumeSlider
                    value={volume}
                    volumeChange={volumeChange}
                    show={setShowVolume}
                  />
                  <RemoveIcon
                    onClick={volMinus}
                    sx={{ cursor: 'pointer', marginTop: 1 }}
                  />
                </Box>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
