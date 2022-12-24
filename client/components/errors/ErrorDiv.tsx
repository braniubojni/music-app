import { Box } from '@mui/system';
import React from 'react';

interface ErrorDivProps {
  msg: string;
}

const ErrorDiv: React.FC<ErrorDivProps> = ({ msg }) => {
  return (
    <Box sx={{ color: 'red' }} component={'div'}>
      {msg}
    </Box>
  );
};

export default ErrorDiv;
