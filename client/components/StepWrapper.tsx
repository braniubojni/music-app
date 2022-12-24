import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

interface StepWrapperProps {
  activeStep: number;
  children: React.ReactNode;
}

const steps = [
  'Information about track',
  'Upload the cover',
  'Upload the track',
];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, i) => (
          <Step key={step + i} completed={activeStep > i}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent={'center'}
        sx={{ margin: '70px 0', height: 270 }}
      >
        <Card sx={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
