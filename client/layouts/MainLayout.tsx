import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Navbar from '../components/Navbar';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
