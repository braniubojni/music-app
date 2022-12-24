import { Grid, TextField } from '@mui/material';
import React from 'react'

const FirstStep: React.FC = () => {
  return (
    <Grid container direction={'column'} p={2}>
      <TextField sx={{mt: 2}} label="Track name" />
      <TextField sx={{mt: 2}} label="Artist name" />
      <TextField sx={{mt: 2}} label="Track text" multiline rows={3} />
    </Grid>
  );
};

export default FirstStep