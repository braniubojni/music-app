import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import FileUpload from '../../components/steps/FileUpload';
import FirstStep from '../../components/steps/FirstStep';
import StepWrapper from '../../components/StepWrapper';
import MainLayout from '../../layouts/MainLayout';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const next = () => {
    if (activeStep !== 2) setActiveStep((prev) => prev + 1);
  };
  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && <FirstStep />}
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
