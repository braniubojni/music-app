import { Grid, TextField } from '@mui/material';
import React from 'react';
import { useInput } from '../../hooks/useInput';

interface IFirstStepProps {
  name: Object;
  artist: Object;
  text: Object;
}

const FirstStep: React.FC<IFirstStepProps> = ({ artist, name, text }) => {
  return (
    <Grid container direction={'column'} p={2}>
      <TextField {...name} sx={{ mt: 2 }} label="Track name" />
      <TextField {...artist} sx={{ mt: 2 }} label="Artist name" />
      <TextField
        {...text}
        sx={{ mt: 2 }}
        label="Track text"
        multiline
        rows={3}
      />
    </Grid>
  );
};

export default FirstStep;
