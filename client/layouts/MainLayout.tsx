import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
