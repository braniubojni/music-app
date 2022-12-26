import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { backEndUrl } from '../../common/env.constants';
import { TRACKS } from '../../common/paths';
import FileUpload from '../../components/steps/FileUpload';
import FirstStep from '../../components/steps/FirstStep';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState('');
  const [audio, setAudio] = useState('');
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const next = () => {
    if (activeStep !== 2) setActiveStep((prev) => prev + 1);
    else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios
        .post(backEndUrl + TRACKS, formData)
        .then(() => router.push(TRACKS))
        .catch((e) => console.error(e.message, 'Upload track err'));
    }
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <FirstStep name={name} artist={artist} text={text} />
        )}
        {activeStep === 1 && (
          <FileUpload accept="image/*" setFile={setPicture}>
            <Button variant="contained">Upload the cover</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload accept="audio/*" setFile={setAudio}>
            <Button variant="outlined">Upload the track</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent={'space-between'}>
        <Button disabled={activeStep === 0} onClick={back} variant="outlined">
          Back
        </Button>
        <Button onClick={next} variant="outlined">
          Next
        </Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
