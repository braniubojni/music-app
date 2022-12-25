import { Container } from '@mui/system';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import styles from '../style/MainLayoutContainer.module.scss'

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className={styles.Container}>{children}</Container>
      <Player />
    </>
  );
};

export default MainLayout;
